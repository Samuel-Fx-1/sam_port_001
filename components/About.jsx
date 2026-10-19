
import Reveal from "./Reveal";
import { bioCards } from "@/lib/data";

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-tag">// about me</span>
          <h2>Turning ideas into clean, working interfaces</h2>
          <p>A quick snapshot of what I&apos;m doing, what I know and how to reach me.</p>
        </Reveal>

        <div className="about-grid">
          {bioCards.map((card, i) => (
            <Reveal key={card.title} className="info-card" delay={i * 70}>
              <span className="ico">{card.icon}</span>
              <h4>{card.title}</h4>
              {card.href ? (
                <a
                  className="value"
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {card.body} {card.href.startsWith("http") && "↗"}
                </a>
              ) : (
                <p>{card.body}</p>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}