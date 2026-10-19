import Reveal from "./Reveal";
import { profile, socials } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <Reveal className="contact-box">
          <span className="sec-tag">// contact</span>
          <h2>Let&apos;s build something cool</h2>
          <p>
            I&apos;m open to freelance work, collaborations and junior frontend
            roles. Drop me a message — I usually reply within a day.
          </p>

          <a href={`mailto:${profile.email}`} className="btn btn-primary">
            ✉ {profile.email}
          </a>

          <div className="socials">
            {socials.map((s) => (
              <a
                key={s.label}
                className="soc"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>

          <a className="mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}