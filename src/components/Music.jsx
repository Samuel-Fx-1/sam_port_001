export default function Music() {
  return (
    <section id="music" className="section" style={{ paddingTop: "2rem" }}>
      <div className="container">
        <div className="music-wrap">
          <button className="music-btn" data-music-toggle>🎵 Play Music</button>
          <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Spotify / iTunes preview (optional credentials)</span>
        </div>
      </div>
    </section>
  );
}

