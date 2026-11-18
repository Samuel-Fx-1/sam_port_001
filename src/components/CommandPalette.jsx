export default function CommandPalette({ open, onClose, onCommand }) {
  const actions = [
    { name: "navigate", args: { section: "about" }, label: "Go to About" },
    { name: "navigate", args: { section: "projects" }, label: "Go to Projects" },
    { name: "navigate", args: { section: "contact" }, label: "Go to Contact" },
    { name: "theme", args: {}, label: "Toggle theme" },
    { name: "music", args: {}, label: "Play music" },
    { name: "contact", args: {}, label: "Open contact" }
  ];
  return (
    <div className={`command-palette ${open ? "open" : ""}`} aria-hidden={!open}>
      <input autoFocus placeholder="Press ⌘K — type a command…" />
      <div className="command-actions">
        {actions.map((a, i) => (
          <button key={i} className="command-item" onClick={() => onCommand(a.name, a.args)}>
            <strong>{a.label}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}
