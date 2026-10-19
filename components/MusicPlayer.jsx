"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const DEFAULT_URL = "https://open.spotify.com/playlist/4YwiOnTq0gxE5dXeDsJPdQ";

function toEmbed(url) {
  const match = url.match(
    /open\.spotify\.com\/(?:intl-[a-z-]+\/)?(track|album|playlist|artist|episode|show)\/([A-Za-z0-9]+)/
  );
  if (!match) return null;
  const [, type, id] = match;
  return {
    src: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`,
    height: type === "track" || type === "episode" ? 152 : 352,
  };
}

export default function MusicPlayer() {
  const [input, setInput] = useState("");
  const [embed, setEmbed] = useState(toEmbed(DEFAULT_URL));
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const result = toEmbed(input.trim());
    if (!result) {
      setError("Paste a valid Spotify link (track, album, playlist or artist).");
      return;
    }
    setError("");
    setEmbed(result);
  }

  return (
    <section id="music">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-tag">// music</span>
          <h2>What I&apos;m listening to</h2>
          <p>Paste any Spotify link and play it here.</p>
        </Reveal>

        <Reveal className="music-body">
          <form className="music-form" onSubmit={handleSubmit}>
            <input
              className="music-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://open.spotify.com/track/..."
            />
            <button type="submit" className="btn btn-primary">
              Play
            </button>
          </form>

          {error && <p className="music-error">{error}</p>}

          <div className="music-frame">
            <iframe
              key={embed.src}
              title="Spotify player"
              src={embed.src}
              width="100%"
              height={embed.height}
              style={{ borderRadius: 12, border: 0 }}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}