const { SYSTEM_PROMPT, DEFAULT_MODEL } = require("./_content");

export default async function handler(req, res)
{
    if (req.method !== "POST")
        return res.status(405).json({ error: "Method not allowed" });

    const { message } = req.body || {};
    if (!message)
        return res.status(400).json({ error: "Missing message" });

    if (!process.env.OPENROUTER_API_KEY)
        return res.status(503).json({ reply: "Ask AI is not configured. Add OPENROUTER_API_KEY in Vercel." });

    try
    {
        const completion = await fetch("https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "HTTP-Referer": process.env.PUBLIC_SITE_URL || "https://samuel3d.vercel.app",
                    "X-Title": "Samuel Fx Portfolio"
                },
                body: JSON.stringify(
                    {
                        model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
                        messages:
                        [
                            { role: "system", content: SYSTEM_PROMPT },
                            { role: "user", content: message }
                        ]
                    }
                )
            }
        );
        const data = await completion.json();
        const reply = data.choices?.[0]?.message?.content || "No response from assistant.";
        return res.status(200).json({ reply });
    }
    catch (err)
    {
        return res.status(502).json({ reply: "Assistant unavailable right now." });
    }
}
