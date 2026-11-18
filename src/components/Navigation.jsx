export default function Navigation({ nav }) {
  return (
    <nav className="nav-wrap">
      <div className="brand" style={{ fontWeight: 800, fontSize: 1.1rem, letterSpacing: 0.05em }}>
        Samuel Fx
      </div>
      <ul className="nav-list">
        {nav.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
