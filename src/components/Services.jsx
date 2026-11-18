import { services } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

export default function Services({ t }) {
  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-tag">// services</span>
          <h2>{t("heading")}</h2>
          <p className="text-muted">{t("sub")}</p>
        </Reveal>
        <div className="services-grid">
          {services.map((s, i) => (
            <Reveal key={s.title} className="service-card" delay={i * 80}>
              <h3>{s.title}</h3>
              <p className="text-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
