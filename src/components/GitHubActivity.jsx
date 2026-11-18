import { useState, useEffect } from "react";

export default function GitHubActivity({ user }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=6`)
      .then((r) => r.json())
      .then((data) => { setRepos(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user]);

  return (
    <section id="github" className="section">
      <div className="container">
        <div className="sec-head" style={{ marginBottom: 1.5rem }}>
          <span className="sec-tag">// github</span>
          <h2>GitHub Activity</h2>
          <p className="text-muted">Recent public repositories.</p>
        </div>
        <div className="github-card">
          {loading ? (
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Loading repositories…</p>
          ) : repos.length === 0 ? (
            <p className="empty">No public repositories found.</p>
          ) : (
            <div className="repos">
              {repos.map((r) => (
                <a key={r.id} className="repo" href={r.html_url} target="_blank" rel="noopener noreferrer">{r.name}</a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
