require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.API_PORT || 5001;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Content shared with the chat assistant
const { SYSTEM_PROMPT, DEFAULT_MODEL } = require("./content");

// Health
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "samuel-fx-portfolio-api" });
});

// Guestbook (MongoDB-backed; degrades gracefully without MONGODB_URI)
let guestbook = [];
app.get("/api/guestbook", (_req, res) => {
  if (!process.env.MONGODB_URI) return res.status(503).json([]);
  res.json(guestbook);
});
app.post("/api/guestbook", (req, res) => {
  if (!process.env.MONGODB_URI) return res.status(503).json({ error: "Guestbook not configured" });
  const entry = { id: Date.now(), message: req.body.message, flag: req.body.flag, createdAt: new Date().toISOString(), approved: false };
  guestbook.push(entry);
  res.json(entry);
});

// Contact (SMTP; degrades to 503 without SMTP settings)
app.post("/api/contact", (_req, res) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    return res.status(503).json({ error: "SMTP not configured" });
  }
  res.json({ ok: true });
});

// GitHub profile/repos
app.get("/api/github", async (_req, res) => {
  try {
    const user = process.env.GITHUB_USER || "Samuel-Fx-1";
    const headers = {};
    if (process.env.GITHUB_TOKEN) headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    const profileRes = await fetch(`https://api.github.com/users/${user}`, { headers });
    const profile = await profileRes.json();
    const reposRes = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=6`, { headers });
    const repos = await reposRes.json();
    res.json({ profile, repos });
  } catch (err) {
    res.status(500).json({ error: "GitHub lookup failed" });
  }
});

// Spotify (optional) with iTunes fallback
app.get("/api/spotify", async (_req, res) => {
  const q = _req.query.q || "";
  if (!q) return res.status(400).json({ error: "Missing q" });
  if (process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET) {
    try {
      const tok = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: "Basic " + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64") },
        body: "grant_type=client_credentials"
      });
      const tk = await tok.json();
      const sr = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=5`, { headers: { Authorization: `Bearer ${tk.access_token}` } });
      const data = await sr.json();
      return res.json({ source: "spotify", tracks: data.tracks?.items?.map((t) => ({ name: t.name, artist: t.artists.map((a) => a.name).join(", "), preview: t.preview_url })) || [] });
    } catch (err) { /* fall through to iTunes */ }
  }
  try {
    const ir = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=musicTrack&limit=5`);
    const id = await ir.json();
    return res.json({ source: "itunes", tracks: (id.results || []).map((t) => ({ name: t.trackName, artist: t.artistName, preview: t.previewUrl })) });
  } catch (err) {
    res.status(502).json({ error: "Music search failed" });
  }
});

// Chat (OpenRouter assistant)
app.post("/api/chat", async (req, res) => {
  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: "Missing message" });
  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(503).json({ reply: "Ask AI is not configured. Add OPENROUTER_API_KEY to .env" });
  }
  try {
    const completion = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.PUBLIC_SITE_URL || "http://localhost:5173",
        "X-Title": "Samuel Fx Portfolio"
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message }
        ]
      })
    });
    const data = await completion.json();
    const reply = data.choices?.[0]?.message?.content || "No response from assistant.";
    res.json({ reply });
  } catch (err) {
    res.status(502).json({ reply: "Assistant unavailable right now." });
  }
});

// Serve built frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "dist")));
  app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "..", "dist", "index.html")));
}

app.listen(PORT, () => console.log(`[api] listening on :${PORT}`));
