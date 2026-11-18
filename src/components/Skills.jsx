import { skills } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

export default function Skills({ t }) {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-tag">// languages &amp; tools</span>
          <h2>{t("heading")}</h2>
          <p className="text-muted">{t("sub")}</p>
        </Reveal>
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} className="skill" delay={(i % 6) * 60}>
              <img src={skill.icon} alt={`${skill.name} logo`} loading="lazy" />
              <span>{skill.name}</span>
              <small>{skill.level}</small>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
