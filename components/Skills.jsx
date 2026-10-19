/* eslint-disable @next/next/no-img-element */
import Reveal from "./Reveal";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-tag">// languages &amp; tools</span>
          <h2>My toolbox</h2>
          <p>The technologies I use to design, build and ship the web.</p>
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