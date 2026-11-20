import { useEffect } from "react";
import { ScrollTrigger } from "./lib/gsap";
import SmoothScroll from "./components/SmoothScroll";
import LightboxProvider from "./components/Lightbox";
import ScrollProgress from "./components/ScrollProgress";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import MobileDock from "./components/MobileDock";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Work from "./components/Work";
import Reel from "./components/Reel";
import About from "./components/About";
import Services from "./components/Services";
import Cases from "./components/Cases";
import Tools from "./components/Tools";
import Clients from "./components/Clients";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  // Web fonts change text metrics, so recalculate every ScrollTrigger once they're ready.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <SmoothScroll>
      <LightboxProvider>
        <ScrollProgress />
        <Cursor />
        <div className="grain" aria-hidden="true" />
        <Header />
        <MobileDock />
        <main>
          <Hero />
          <Marquee />
          <Work />
          <Reel />
          <About />
          <Services />
          <Cases />
          <Tools />
          <Clients />
          <Contact />
        </main>
        <Footer />
      </LightboxProvider>
    </SmoothScroll>
  );
}
