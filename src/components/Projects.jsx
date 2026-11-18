import { projects } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

export default function Projects({ t }) {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-tag">// projects</span>
          <h2>{t("heading")}</h2>
          <p className="text-muted">{t("sub")}</p>
        </Reveal>
        <div className="projects">
          {projects.map((project, i) => (
            <Reveal key={project.title} className="project" delay={i * 90}>
              <div className="thumb">
                {project.image ? <img src={project.image} alt={project.title} className="thumb-img" loading="lazy" /> : project.emoji}
              </div>
              <div className="body">
                <h3>{project.title}</h3>
                <p className="text-muted">{project.description}</p>
                <div className="tags">{project.tags.map((tag) => <b key={tag}>{tag}</b>)}</div>
                <a className="link" href={project.href} target="_blank" rel="noopener noreferrer">View code ↗</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
