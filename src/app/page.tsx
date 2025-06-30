"use client";

import { useLoading } from "@/hooks/useLoading";
import { SITE_CONFIG } from "@/lib/constants";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Loading from "@/components/Loading";
import Particles from "@/components/Particles";
import Interests from "../components/Interests";
import Technologies from "../components/Technologies";
import About from "../components/About";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import GamesSection from "../components/GamesSection";
// import ScrollAnimations from "../components/ScrollAnimations";
import ScrollProgressBar from "../components/ScrollProgressBar";

export default function Home(): React.JSX.Element {
  const loadingState = useLoading();

  return (
    <>
      <Loading loadingState={loadingState} />

      {!loadingState.isLoading && (
        <main className="min-h-screen bg-black text-white relative">
          <ScrollProgressBar />
          <Particles />

          <Header />

          <div className="relative z-10">
            <div className="container main-container mx-auto px-4 md:px-6 min-h-screen">
              <Hero
                heading={SITE_CONFIG.author}
                description={SITE_CONFIG.description}
                imageSrc="/Images/irfan.png"
                imageAlt={`${SITE_CONFIG.author} - Frontend Developer`}
                className="pt-20"
              />

              <Skills />
              <Interests />
              <Technologies />
              <About />
              <Projects />
              <GamesSection />

              {/* Scroll Animations Showcase */}
              {/* <ScrollAnimations /> */}
            </div>

            <Footer />
          </div>
        </main>
      )}
    </>
  );
}
