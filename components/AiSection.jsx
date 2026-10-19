
import Reveal from "./Reveal";

const FEATURES = [
  {
    icon: "⚡",
    title: "Streaming replies",
    body: "Answers appear word-by-word as the model generates them."
  },
  {
    icon: "🧠",
    title: "Knows this site",
    body: "It's primed with my skills, projects and contact details."
  },
  {
    icon: "🔐",
    title: "Key stays secret",
    body: "Your OpenRouter key lives server-side, never in the browser."
  }
];

export default function AiSection() {
  return (
    <section id="ai">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-tag">// ai assistant</span>
          <h2>Ask me anything</h2>
          <p>
            This portfolio ships with an AI assistant running on{" "}
            <a
              className="inline-link"
              href="https://openrouter.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenRouter
            </a>
            . Curious about my stack, my projects or how to work with me? Just ask.
          </p>
        </Reveal>

        <div className="ai-grid">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} className="ai-card" delay={i * 80}>
              <span className="ico">{f.icon}</span>
              <h4>{f.title}</h4>
              <p>{f.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="ai-cta" delay={120}>
          <p>
            Hit the <strong>✨ Ask Samuel AI</strong> button in the corner — or press{" "}
            <kbd>⌘</kbd> <kbd>K</kbd> — and start typing.
          </p>
        </Reveal>
      </div>
    </section>
  );
}