import { useState, useEffect } from "react";
import { suggestions } from "../data/portfolio.js";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const key = document.addEventListener ? null : null;
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((p) => !p);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const send = async () => {
    if (!input.trim()) return;
    const user = input;
    setInput("");
    setLoading(true);
    setMessages((p) => [...p, { role: "user", text: user }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: user })
      });
      const data = await res.json().catch(() => ({ reply: "Sorry, I couldn&apos;t reach the assistant." }));
      setMessages((p) => [...p, { role: "bot", text: data.reply || "No response." }]);
    } catch (err) {
      setMessages((p) => [...p, { role: "bot", text: "Assistant unavailable right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-wrap" aria-label="AI assistant">
      <div className="ai-card">
        <div className="ai-head">
          <span>Ask Sam AI</span>
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "1px solid var(--border)", color: "var(--muted)", padding: "0.25rem 0.6rem", borderRadius: 6, fontSize: "0.8rem", cursor: "pointer" }}>
            {open ? "Hide" : "Show"}
          </button>
        </div>
        {open && (
          <>
            <div className="ai-body">
              {messages.map((m, i) => (
                <div key={i} className={`ai-msg ${m.role}`}>{m.text}</div>
              ))}
              {loading && <div className="ai-msg bot">Typing…</div>}
            </div>
            <div className="ai-suggestions">
              {suggestions.map((s, i) => (
                <span key={i} className="ai-sugg" onClick={() => { setInput(s); send(); }}>{s}</span>
              ))}
            </div>
            <div className="ai-input">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask Samuel&apos;s AI…" />
              <button className="ai-btn" onClick={send} disabled={loading}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
