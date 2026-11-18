import { blog } from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";

export default function Blog() {
  return (
    <section id="blog" className="section">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-tag">// blog</span>
          <h2>Latest posts</h2>
          <p className="text-muted">Notes on development and security.</p>
        </Reveal>
        <div className="blog-grid">
          {blog.map((post, i) => (
            <Reveal key={post.title} className="card" delay={i * 80}>
              <h3>{post.title}</h3>
              <div className="meta">{post.date}</div>
              <p className="text-muted">{post.summary}</p>
              <a href={post.href} className="link">Read more →</a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
