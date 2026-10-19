import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import AiSection from "@/components/AiSection";
import MusicPlayer from "@/components/MusicPlayer";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";

export default function Home() {
  return (
    <>
      <div className="bg-wrap" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="grid-lines" />
      </div>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <AiSection />
        <MusicPlayer />
        <Contact />
      </main>

      <Footer />
      <AIChat />
    </>
  );
}