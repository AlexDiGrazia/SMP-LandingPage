import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProofStrip from "@/components/SocialProofStrip";
import ResultsGallery from "@/components/ResultsGallery";
import AboutKarl from "@/components/AboutKarl";
import WhatSmpDoes from "@/components/WhatSmpDoes";
import WhoItsFor from "@/components/WhoItsFor";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import LeadForm from "@/components/LeadForm";
import FinalCtaAndFooter from "@/components/FinalCtaAndFooter";
import StickyBar from "@/components/StickyBar";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <SocialProofStrip />
      <ResultsGallery />
      <AboutKarl />
      <WhatSmpDoes />
      <WhoItsFor />
      <Process />
      <Pricing />
      <Reviews />
      <LeadForm />
      <FinalCtaAndFooter />
      <StickyBar />
    </>
  );
}
