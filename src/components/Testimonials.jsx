import { testimonials } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-tag">// testimonials</span>
          <h2>What people say</h2>
          <p className="text-muted">Kind words from collaborators.</p>
        </Reveal>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} className="card" delay={i * 80}>
              <p>"{t.body}"</p>
              <div className="meta" style={{ marginTop: 1 }}>
                <strong>{t.name}</strong> <span style={{ opacity: 0.6 }}>{t.role}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
