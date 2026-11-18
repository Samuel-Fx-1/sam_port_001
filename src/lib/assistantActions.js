export const ASSISTANT_ACTIONS = {
  theme: {
    label: "Toggle theme",
    description: "Switch between dark and light theme.",
    run: () => {
      const root = document.documentElement;
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("samuel-theme", next); } catch (e) {}
      return { theme: next };
    }
  },
  language: {
    label: "Switch language",
    description: "Change interface language (English / Kinyarwanda).",
    run: (lang) => {
      const root = document.documentElement;
      root.setAttribute("lang", lang || "en");
      try { localStorage.setItem("samuel-lang", lang || "en"); } catch (e) {}
      return { lang: lang || "en" };
    }
  },
  navigate: {
    label: "Navigate",
    description: "Scroll to a page section.",
    run: (section) => {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return { section };
    }
  },
  music: {
    label: "Play music",
    description: "Start the music player.",
    run: () => {
      const btn = document.querySelector('[data-music-toggle]');
      if (btn) btn.click();
      return { music: true };
    }
  },
  contact: {
    label: "Open contact",
    description: "Open the contact section / mailto link.",
    run: () => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return { contact: true };
    }
  }
};

export const WHITELISTED_ACTIONS = Object.keys(ASSISTANT_ACTIONS);

export function runAction(actionName, args = {}) {
  const action = ASSISTANT_ACTIONS[actionName];
  if (!action) return { error: `Action ${actionName} is not whitelisted.` };
  return action.run(args);
}

export function describeActions() {
  return WHITELISTED_ACTIONS.map((k) => ({ name: k, label: ASSISTANT_ACTIONS[k].label, description: ASSISTANT_ACTIONS[k].description }));
}
