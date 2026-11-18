import { experience } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-tag">// experience</span>
          <h2>Experience</h2>
          <p className="text-muted">Where I&apos;ve worked and what I&apos;ve built.</p>
        </Reveal>
        <div className="experience-grid">
          {experience.map((exp, i) => (
            <Reveal key={exp.role} className="card" delay={i * 80}>
              <div className="org">{exp.org}</div>
              <h3>{exp.role}</h3>
              <div className="meta">{exp.where} · {exp.start} – {exp.end}</div>
              <p>{exp.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
