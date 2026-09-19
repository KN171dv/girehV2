import { useEffect } from "react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteChrome } from "../components/SiteChrome";
import { Hero } from "../components/sections/Hero";
import { Manifesto } from "../components/sections/Manifesto";
import { Craft } from "../components/sections/Craft";
import { Menu } from "../components/sections/Menu";
import { Barbers } from "../components/sections/Barbers";
import { Gallery } from "../components/sections/Gallery";
import { Trust } from "../components/sections/Trust";
import { Contact } from "../components/sections/Contact";
import { initSmoothScroll, ScrollTrigger } from "../lib/motion";

export function Home() {
  useEffect(() => {
    // Física do scroll (só onde é seguro) e sincronia com o ScrollTrigger.
    const stopSmoothScroll = initSmoothScroll();

    // As fontes mudam a altura do texto: remede os gatilhos quando carregarem.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      stopSmoothScroll();
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Manifesto />
        <Craft />
        <Menu />
        <Barbers />
        <Gallery />
        <Trust />
        <Contact />
      </main>
      <SiteChrome />
    </>
  );
}
