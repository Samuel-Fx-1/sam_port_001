
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p>
          © {new Date().getFullYear()} {profile.short} — Built with{" "}
          <span className="heart">♥</span> in Rwanda 🇷🇼 · Next.js + Samuel AI
        </p>
      </div>
    </footer>
  );
}