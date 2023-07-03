import Footer from "@/components/Footer";
import About from "@/features/landing/About";
import Connect from "@/features/landing/Connect";
import Hero from "@/features/landing/Hero";
import NavDesktop from "@/features/landing/NavDesktop";
import NavMobile from "@/features/landing/NavMobile";
import Projects from "@/features/landing/Projects";
import Skills from "@/features/landing/Skills";

export default function LandingIndex() {
  return (
    <main>
      <NavMobile />

      <Hero />

      <NavDesktop />

      <About />

      <Skills />

      <Projects />

      <Connect />

      <Footer />
    </main>
  );
}
