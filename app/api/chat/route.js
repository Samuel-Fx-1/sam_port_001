import { SYSTEM_PROMPT, DEFAULT_MODEL } from "@/lib/systemPrompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MAX_MESSAGES = 20; // how much history we forward
const MAX_CHARS = 4000; // per-message clamp
const MAX_TOKENS = 800;

/** Small JSON helper so errors always look the same to the client. */
const fail = (message, status) =>
  Response.json({ error: message }, { status });

export async function POST(req) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return fail(
      "The AI is not configured yet. Add OPENROUTER_API_KEY to .env.local and restart the server.",
      500
    );
  }

  // ---------- 1. validate + sanitise the incoming conversation ----------
  let payload;
  try {
    payload = await req.json();
  } catch {
    return fail("Invalid JSON body.", 400);
  }

  const raw = Array.isArray(payload?.messages) ? payload.messages : [];

  const messages = raw
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (messages.length === 0) {
    return fail("No messages to send.", 400);
  }

  // ---------- 2. ask OpenRouter (streaming) ----------
  let upstream;
  try {
    upstream = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // Optional attribution headers — safe to leave in.
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Izabayo Samuel Portfolio"
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
        stream: true,
        temperature: 0.7,
        max_tokens: MAX_TOKENS,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages]
      })
    });
  } catch {
    return fail("Could not reach OpenRouter. Check your connection.", 502);
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    let friendly = "OpenRouter rejected the request.";

    if (upstream.status === 401) friendly = "Invalid OPENROUTER_API_KEY.";
    else if (upstream.status === 402)
      friendly = "Your OpenRouter account is out of credits.";
    else if (upstream.status === 429)
      friendly = "Rate limited — wait a moment and try again.";
    else if (upstream.status === 404)
      friendly = "That model id doesn't exist on OpenRouter.";

    return fail(
      `${friendly}${detail ? ` (${detail.slice(0, 200)})` : ""}`,
      upstream.status || 502
    );
  }

  // ---------- 3. convert OpenRouter's SSE into a plain-text stream ----------
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body.getReader();
      let buffer = "";
      let closed = false;

      const close = () => {
        if (closed) return;
        closed = true;
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      };

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // SSE events are separated by newlines; keep the last partial line.
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;

            const data = trimmed.slice(5).trim();
            if (!data) continue;

            if (data === "[DONE]") {
              close();
              return;
            }

            try {
              const parsed = JSON.parse(data);

              // OpenRouter sometimes streams an error object mid-stream.
              if (parsed.error) {
                controller.enqueue(
                  encoder.encode(`\n\n_Error: ${parsed.error.message || "unknown"}_`)
                );
                close();
                return;
              }

              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              /* ignore malformed keep-alive chunks */
            }
          }
        }
        close();
      } catch (err) {
        try {
          controller.enqueue(encoder.encode("\n\n_Connection interrupted._"));
        } catch {
          /* noop */
        }
        close();
      }
    },
    cancel() {
      upstream.body.cancel?.().catch(() => {});
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no"
    }
  });
}