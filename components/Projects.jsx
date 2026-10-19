
import Reveal from "./Reveal";
import Image from "next/image";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-tag">// projects</span>
          <h2>Things I&apos;ve built</h2>
          <p>Swap these placeholders for your real repositories.</p>
        </Reveal>

        <div className="projects">
          {projects.map((project, i) => (
            <Reveal key={project.title} className="project" delay={i * 90}>
              <div className="thumb">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 760px) 100vw, 360px"
                    className="thumb-img"
                  />
                ) : (
                  project.emoji
                )}
              </div>
              <div className="body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <b key={tag}>{tag}</b>
                  ))}
                </div>
                <a
                  className="link"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View code ↗
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}