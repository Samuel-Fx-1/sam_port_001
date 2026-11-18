import { socials } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

export default function Contact({ profile, t }) {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-box">
          <Reveal className="sec-head">
            <span className="sec-tag">// contact</span>
            <h2>{t("heading")}</h2>
            <p className="text-muted">{t("sub")}</p>
          </Reveal>
          <a href={`mailto:${profile.email}`} className="btn btn-primary">✉ {profile.email}</a>
          <div className="socials">
            {socials.map((s) => (
              <a key={s.label} className="soc" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d={s.path} /></svg>
              </a>
            ))}
          </div>
          <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </div>
    </section>
  );
}
