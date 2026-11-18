import { useState, useEffect } from "react";
import { profile, nav } from "./data/portfolio.js";
import { t, DEFAULT_LOCALE, STORAGE_KEY } from "./lib/i18n.js";
import Loader from "./components/Loader.jsx";
import Starfield from "./components/Starfield.jsx";
import Navigation from "./components/Navigation.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Services from "./components/Services.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Blog from "./components/Blog.jsx";
import Contact from "./components/Contact.jsx";
import GitHubActivity from "./components/GitHubActivity.jsx";
import Music from "./components/Music.jsx";
import Footer from "./components/Footer.jsx";
import Toolbar from "./components/Toolbar.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import AIAssistant from "./components/AIAssistant.jsx";
import Guestbook from "./components/Guestbook.jsx"; // intentionally not mounted in main view
import "./styles/index.css";

export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || "dark"; } catch (e) { return "dark"; }
  });
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [loaded, setLoaded] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("lang", locale);
  }, [theme, locale]);

  useEffect(() => {
    const tmr = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(tmr);
  }, []);

  const handleCommand = (action, args) => {
    if (action === "navigate") {
      setCommandOpen(false);
      return;
    }
    setCommandOpen(false);
  };

  return (
    <div className="app" data-theme={theme}>
      <Starfield />
      {!loaded ? <Loader /> : null}

      <Toolbar theme={locale} onToggleTheme={() => setTheme((p) => (p === "dark" ? "light" : "dark"))} onLocaleChange={setLocale} />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} onCommand={handleCommand} />

      <header className="site-header">
        <Navigation nav={nav} />
      </header>

      <main>
        <Hero profile={profile} t={(k, p) => t(locale, `hero.${k}`, p)} />
        <About t={(k, p) => t(locale, `about.${k}`, p)} />
        <Skills t={(k, p) => t(locale, `skills.${k}`, p)} />
        <Services t={(k, p) => t(locale, `services.${k}`, p)} />
        <Projects t={(k, p) => t(locale, `projects.${k}`, p)} />
        <Experience />
        <Testimonials />
        <Blog />
        <Contact profile={profile} t={(k, p) => t(locale, `contact.${k}`, p)} />
        <GitHubActivity user={profile.email.split("@")[0]} />
        <Music />
      </main>

      <AIAssistant />
      <Footer t={(k) => t(locale, `footer.${k}`)} />

      {/* Guestbook exists but is intentionally NOT mounted on the main page. */}
      {/* <Guestbook /> */}
    </div>
  );
}
