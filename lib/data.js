export const profile = {
  name: "IZABAYO SAMUEL",
  short: "Izabayo Samuel",
  initials: "IS",
  role: "Frontend Developer",
  location: "Kigali, Rwanda",
  timezone: "UTC+2",
  email: "samuelislislegend8@gmail.com",
  tagline:
    "A passionate frontend developer from Rwanda crafting fast, accessible and delightful web experiences with React, Vue and modern JavaScript."
};

export const bioCards = [
  {
    icon: "🔭",
    title: "Currently working on",
    body: "My Portfolio",
    href: null
  },
  {
    icon: "💬",
    title: "Ask me about",
    body: "React, Front-End, Back-End",
    href: null
  },
  {
    icon: "🌱",
    title: "All of my projects",
    body: "github.com/YOUR_USERNAME",
    href: "https://github.com/YOUR_USERNAME?tab=repositories"
  },
  {
    icon: "📫",
    title: "How to reach me",
    body: "samuelislislegend8@gmail.com",
    href: "mailto:samuelislislegend8@gmail.com"
  }
];

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";

export const skills = [
  { name: "HTML5",      icon: DEVICON + "html5/html5-original.svg",            level: "Advanced" },
  { name: "CSS3",       icon: DEVICON + "css3/css3-original.svg",              level: "Advanced" },
  { name: "JavaScript", icon: DEVICON + "javascript/javascript-original.svg",  level: "Advanced" },
  { name: "Bootstrap",  icon: DEVICON + "bootstrap/bootstrap-original.svg",    level: "Advanced" },
  { name: "Node.js",    icon: DEVICON + "nodejs/nodejs-original.svg",          level: "Intermediate" },
  { name: "Vue.js",     icon: DEVICON + "vuejs/vuejs-original.svg",            level: "Intermediate" },
  { name: "React",      icon: DEVICON + "react/react-original.svg",            level: "Intermediate" },
  { name: "Next.js",    icon: DEVICON + "nextjs/nextjs-original.svg",          level: "Learning" },
  { name: "Tailwind",   icon: DEVICON + "tailwindcss/tailwindcss-original.svg",level: "Intermediate" },
  { name: "Git",        icon: DEVICON + "git/git-original.svg",                level: "Intermediate" },
  { name: "Figma",      icon: DEVICON + "figma/figma-original.svg",            level: "Intermediate" },
  { name: "VS Code",    icon: DEVICON + "vscode/vscode-original.svg",          level: "Daily driver" }
];

export const projects = [
  {
    emoji: "🎨",
    image: "/projects/portfolio.png",
    title: "Personal Portfolio",
    description:
      "A responsive portfolio website with smooth animations, a dark theme and an AI assistant powered by OpenRouter.",
    tags: ["Next.js", "React", "OpenRouter"],
    href: "https://github.com/Samuel-Fx-1"
  },
  {
    emoji: "🛒",
    image: "/projects/ecommerce.png",
    title: "E-Commerce UI",
    description:
      "Shopping interface built with React — cart state, product filters and a full checkout flow.",
    tags: ["React", "Bootstrap", "REST API"],
    href: "https://github.com/Samuel-Fx-1"
  },
  {
    emoji: "📊",
    image: "/projects/dashboard.png",
    title: "Dashboard App",
    description:
      "Analytics dashboard with charts, authentication and a Node.js / Express backend.",
    tags: ["Vue", "Node.js", "Express"],
    href: "https://github.com/Samuel-Fx-1"
  }
];

export const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Samuel-Fx-1",
    path: "M12 .3a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.4 1.24-3.24-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.24a11.4 11.4 0 0 1 6.01 0c2.28-1.56 3.29-1.24 3.29-1.24.66 1.65.25 2.88.12 3.18.78.84 1.24 1.92 1.24 3.24 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .3z"
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/Samuel-Fx-1",
    path: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.52V24H.24V8.25zM8.34 8.25h4.33v2.15h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.92V24h-4.51v-7.79c0-1.86-.03-4.25-2.59-4.25-2.6 0-3 2.03-3 4.12V24H8.34V8.25z"
  },
  {
    label: "Dev.to",
    href: "https://dev.to/Samuel-Fx-1",
    path: "M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.85-.31h1.65v1.28zm5.03 0h-2.4v1.23h1.68v1.28h-1.68v1.27h2.39v1.28h-2.62c-2.03 0-2.05 0-2.3-.29-.26-.29-.26-.31-.26-3.46 0-3.1 0-3.17.25-3.48.24-.3.27-.3 2.4-.3h2.54v1.29z"
  },
  {
    label: "Instagram",
    href: "https://instagram.com/samuel__fx_1/",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.41-10.4a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@YOUR_CHANNEL",  
    path: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"
  }
];

export const suggestions = [
  "What does Samuel do?",
  "Which tech does he use?",
  "How do I hire him?",
  "Show me a React tip"
];