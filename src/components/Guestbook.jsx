import { useState, useEffect } from "react";

export default function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState("us");

  useEffect(() => {
    fetch("/api/guestbook")
      .then((r) => r.json())
      .then((data) => setEntries(Array.isArray(data) ? data : []))
      .catch(() => setEntries([]));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, flag })
    });
    setMessage("");
    window.location.reload();
  };

  return (
    <section id="guestbook" className="section">
      <div className="container">
        <h2>Guestbook</h2>
        <form onSubmit={submit} style={{ display: "flex", gap: 0.5rem, marginBottom: 1.5rem, flexWrap: "wrap" }}>
          <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Leave a message…" required style={{ flex: 1, padding: 0.6rem, borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-alt)", color: "var(--text)" }} />
          <select value={flag} onChange={(e) => setFlag(e.target.value)} style={{ padding: 0.6rem, borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-alt)", color: "var(--text)" }}>
            <option value="us">🇺🇸</option><option value="rw">🇷🇼</option><option value="ke">🇰🇪</option><option value="ug">🇺🇬</option><option value="tz">🇹🇿</option>
          </select>
          <button className="btn btn-primary" type="submit">Post</button>
        </form>
        <div style={{ display: "grid", gap: 0.75rem }}>
          {entries.map((e, i) => (
            <div key={i} className="card" style={{ padding: 1 }}>
              <p>{e.message}</p>
              <div className="meta" style={{ marginTop: 0.4rem }}>{e.flag || "🏁"} · {new Date(e.createdAt || Date.now()).toLocaleDateString()}</div>
            </div>
          ))}
          {entries.length === 0 && <p style={{ color: "var(--muted)", fontSize: 0.9 }}>No entries yet.</p>}
        </div>
      </div>
    </section>
  );
}
