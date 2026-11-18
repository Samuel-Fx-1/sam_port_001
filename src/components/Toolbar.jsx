export default function Toolbar({ theme, onToggleTheme, onLocaleChange }) {
  return (
    <div className="toolbar" aria-label="Toolbar">
      <button className="toolbar-btn" title={theme} onClick={onToggleTheme}>🌓</button>
      <button className="toolbar-btn" title="Command palette" onClick={() => {}}>⌘K</button>
      <button className="toolbar-btn" title="AI assistant" onClick={() => {}}>✨</button>
      <button className="toolbar-btn" title="Music" onClick={() => {}}>🎵</button>
    </div>
  );
}
