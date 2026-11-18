export const LOCALES = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      services: "Services",
      projects: "Projects",
      experience: "Experience",
      testimonials: "Testimonials",
      blog: "Blog",
      contact: "Contact"
    },
    hero: {
      available: "Available for work",
      tagline: "Hi, I'm {{name}}",
      viewWork: "View my work →",
      askAI: "✨ Ask my AI",
      getInTouch: "✉ Get in touch"
    },
    about: {
      heading: "Turning ideas into clean, working interfaces",
      sub: "A quick snapshot of what I'm doing, what I know and how to reach me."
    },
    skills: {
      heading: "My toolbox",
      sub: "The technologies I use to design, build and ship the web."
    },
    services: {
      heading: "What I offer",
      sub: "Services I provide as a developer and security analyst."
    },
    projects: {
      heading: "Things I've built",
      sub: "Swap these placeholders for your real repositories."
    },
    contact: {
      heading: "Let's build something cool",
      sub:
        "I'm open to freelance work, collaborations and junior frontend roles. Drop me a message — I usually reply within a day."
    },
    footer: {
      madeBy: "Made with ❤️ by Izabayo Samuel (Samuel Fx) — Kigali, Rwanda"
    },
    ai: {
      title: "Ask Sam AI",
      placeholder: "Type your message…",
      suggestions: ["What does Samuel do?", "Which tech does he use?", "How do I hire him?"]
    },
    theme: {
      toggle: "Toggle theme"
    },
    lang: {
      en: "English",
      rw: "Kinyarwanda"
    }
  },
  rw: {
    nav: {
      home: "Inzu",
      about: "Kuresha",
      skills: "Ubuvuge",
      services: "Inyenyeri",
      projects: "Ibiganiro",
      experience: "Ibyo yagenze",
      testimonials: "Ubuhinga",
      blog: "Blog",
      contact: "Kumva"
    },
    hero: {
      available: "Desha kugira",
      tagline: "Mwizera Samuel",
      viewWork: "Bona icyo nasohutse →",
      askAI: "✨ Mwanditse Sam AI",
      getInTouch: "✉ Karaba"
    },
    about: {
      heading: "Kwizera gukira ikiganiro cyiza cyo kumenya",
      sub: "Igicaniro cy’ikoresho cyanjye, nsinzi nzego nshobora kuhingana n’owe."
    },
    skills: {
      heading: "Ubuvuge bwanje",
      sub: "Icyo nshobora kutegura, kugira n’icyo kuganira n’i cyangiwe."
    },
    services: {
      heading: "Nshobora kutera",
      sub: "Ibirenga nzego ndahaba n’umwigisha webu n’umurinzi w’icyumba cya webu."
    },
    projects: {
      heading: "Icyo nasohutse",
      sub: "Tegura ubutumwa bwige bikomeye ku biganiro byawe."
    },
    contact: {
      heading: "Twishimire kigango kiza",
      sub:
        "Ndaba gushyiraho, kubana n’abahinzi n’ipapuro nyuma. Somwo n’inanga — ndashobora komeza n’inuma itanu."
    },
    footer: {
      madeBy: "Yejurwe na ❤️ na Izabayo Samuel (Samuel Fx) — Kigali, Rwanda"
    },
    ai: {
      title: "Mwanditse Sam AI",
      placeholder: "Andika ubutumwa bwawe…",
      suggestions: ["Ahibaza Samuel adufite?", "Mwanditse nicyo adufite?", "Ndakwira awe he?"]
    },
    theme: {
      toggle: "Emeza iti"
    },
    lang: {
      en: "English",
      rw: "Ikinyarwanda"
    }
  }
};

export const DEFAULT_LOCALE = "en";
export const STORAGE_KEY = "samuel-theme";

export function t(locale, key, params = {}) {
  const sections = LOCALES[locale] || LOCALES[DEFAULT_LOCALE];
  const keys = key.split(".");
  let value = sections;
  for (const k of keys) {
    value = value && value[k] ? value[k] : key;
    if (typeof value === "string") break;
  }
  if (typeof value !== "string") return key;
  return value.replace(/\{\{(\w+)\}\}/g, (_, p) => params[p] !== undefined ? params[p] : `{${p}}`);
}
