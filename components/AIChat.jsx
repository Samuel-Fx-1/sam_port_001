
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile, suggestions } from "@/lib/data";

const STORAGE_KEY = "sam-ai-history-v1";

/* ------------------------------------------------------------------ */
/*  Tiny markdown renderer (code fences, inline code, **bold**)        */
/* ------------------------------------------------------------------ */

function renderInline(line) {
  const tokens = line
    .split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
    .filter((t) => t !== "");

  return tokens.map((token, i) => {
    if (token.length > 2 && token.startsWith("`") && token.endsWith("`")) {
      return (
        <code key={i} className="inline-code">
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.length > 4 && token.startsWith("**") && token.endsWith("**")) {
      return <strong key={i}>{token.slice(2, -2)}</strong>;
    }
    return <span key={i}>{token}</span>;
  });
}

function RichText({ text }) {
  const blocks = text.split("```");

  return (
    <>
      {blocks.map((block, i) => {
        // Odd indexes are fenced code blocks.
        if (i % 2 === 1) {
          const newline = block.indexOf("\n");
          const code = newline > -1 ? block.slice(newline + 1) : block;
          return (
            <pre key={i} className="code-block">
              <code>{code.replace(/\n$/, "")}</code>
            </pre>
          );
        }

        const lines = block.split("\n");
        return (
          <span key={i}>
            {lines.map((line, j) => (
              <span key={j}>
                {renderInline(line)}
                {j < lines.length - 1 && <br />}
              </span>
            ))}
          </span>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Chat widget                                                        */
/* ------------------------------------------------------------------ */

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  /* ---------- restore / persist history ---------- */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setMessages(parsed.slice(-20));
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
    } catch {
      /* storage full / disabled */
    }
  }, [messages, hydrated]);

  /* ---------- autoscroll ---------- */
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy, open]);

  /* ---------- focus input when opening ---------- */
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 260);
      return () => clearTimeout(t);
    }
  }, [open]);

  /* ---------- ⌘K / Ctrl+K shortcut ---------- */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ---------- core: send + stream ---------- */
  const send = useCallback(
    async (rawText) => {
      const text = (rawText ?? "").trim();
      if (!text || busy) return;

      setError("");
      setInput("");

      const userMessage = { role: "user", content: text };
      const history = [...messages, userMessage];

      // Push the user turn + an empty assistant turn we will fill in.
      setMessages([...history, { role: "assistant", content: "" }]);
      setBusy(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal
        });

        if (!res.ok) {
          let message = `Request failed (${res.status})`;
          try {
            const data = await res.json();
            if (data?.error) message = data.error;
          } catch {
            /* non-JSON error body */
          }
          throw new Error(message);
        }

        if (!res.body) throw new Error("No response stream.");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          accumulated += decoder.decode(value, { stream: true });

          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: "assistant",
              content: accumulated
            };
            return next;
          });
        }

        // If the model returned nothing at all, say so instead of a blank bubble.
        if (!accumulated.trim()) {
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: "assistant",
              content: "Hmm, I got an empty reply. Try asking that again?"
            };
            return next;
          });
        }
      } catch (err) {
        const aborted = err?.name === "AbortError";
        const message = aborted
          ? "Stopped."
          : err?.message || "Something went wrong.";

        if (!aborted) setError(message);

        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];

          if (last && last.role === "assistant" && !last.content.trim()) {
            // Remove the empty placeholder bubble.
            return next.slice(0, -1);
          }
          if (aborted && last?.role === "assistant") {
            next[next.length - 1] = {
              role: "assistant",
              content: `${last.content}\n\n_(stopped)_`
            };
          }
          return next;
        });
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy, messages]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const stop = () => {
    abortRef.current?.abort();
    setBusy(false);
  };

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setError("");
    setBusy(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  };

  const showSuggestions = useMemo(
    () => messages.length === 0 && !busy,
    [messages.length, busy]
  );

  return (
    <>
      {/* ---------- floating launcher ---------- */}
      <button
        type="button"
        className={`chat-fab ${open ? "hidden" : ""}`}
        onClick={() => setOpen(true)}
        aria-label="Open the AI assistant"
      >
        <span className="fab-icon">✨</span>
        <span className="fab-label">Ask AI</span>
      </button>

      {/* ---------- panel ---------- */}
      <div
        className={`chat-panel ${open ? "open" : ""}`}
        role="dialog"
        aria-label="AI assistant"
        aria-hidden={!open}
      >
        <div className="chat-head">
          <div className="chat-id">
            <span className="chat-avatar">✨</span>
            <div>
              <strong>Sam AI</strong>
              <small>Powered by OpenRouter</small>
            </div>
          </div>

          <div className="chat-actions">
            <button
              type="button"
              onClick={clearChat}
              title="Clear conversation"
              aria-label="Clear conversation"
            >
              ↺
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              title="Close"
              aria-label="Close assistant"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="chat-body" ref={bodyRef}>
          {messages.length === 0 && (
            <div className="chat-intro">
              <span className="chat-avatar big">✨</span>
              <h4>Hey there 👋</h4>
              <p>
                I&apos;m Samuel&apos;s AI assistant. Ask me about his skills,
                projects, or how to get in touch — anything really.
              </p>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              <div className="bubble">
                {m.content ? (
                  <RichText text={m.content} />
                ) : (
                  <span className="typing">
                    <i />
                    <i />
                    <i />
                  </span>
                )}
              </div>
            </div>
          ))}

          {error && <div className="chat-error">{error}</div>}
        </div>

        {showSuggestions && (
          <div className="chat-suggestions">
            {suggestions.map((s) => (
              <button key={s} type="button" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <form className="chat-form" onSubmit={onSubmit}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything…"
            aria-label="Your message"
            autoComplete="off"
            disabled={busy}
          />
          {busy ? (
            <button type="button" className="chat-send stop" onClick={stop}>
              ■
            </button>
          ) : (
            <button
              type="submit"
              className="chat-send"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              ↑
            </button>
          )}
        </form>

        <div className="chat-foot">
          Answers can be wrong — verify anything important ·{" "}
          <a href={`mailto:${profile.email}`}>email Samuel</a>
        </div>
      </div>

      {open && <div className="chat-backdrop" onClick={() => setOpen(false)} />}
    </>
  );
}