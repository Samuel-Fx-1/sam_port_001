
"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

const PHRASES = [
  "FULL-STACK DEVELOPER",
  "Forex Trader",
  "Building cool things in Rwanda!"
];

export default function Hero() {
  const [text, setText] = useState("");

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = PHRASES[phraseIndex];
      charIndex = deleting ? charIndex - 1 : charIndex + 1;
      setText(word.slice(0, charIndex));

      let delay = deleting ? 45 : 90;

      if (!deleting && charIndex === word.length) {
        delay = 1800;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        delay = 380;
      }

      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div>
          <span className="pill">
            <span className="pulse" />
            Available for work
          </span>

          <h1>
            Hi, I&apos;m
            <br />
            <span className="grad">{profile.name}</span>
          </h1>

          <div className="type-line">
            <span>{text}</span>
            <span className="caret" />
          </div>

          <p className="lead">{profile.tagline}</p>

          <div className="btn-row">
            <a href="#projects" className="btn btn-primary">
              View my work →
            </a>
            <a href="#ai" className="btn btn-ai">
              ✨ Ask my AI
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-ghost">
              ✉ Get in touch
            </a>
          </div>
        </div>

        <div className="avatar-wrap">
          <div className="ring" />
          <div className="avatar">
            <div className="avatar-inner">
              <span>{profile.initials}</span>
            </div>
          </div>
          <p className="flag">
            &lt;/&gt; {profile.location} · {profile.timezone}
          </p>
        </div>
      </div>
    </section>
  );
}