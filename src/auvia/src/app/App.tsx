import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { TrustedBy } from "./components/TrustedBy";
import { Features } from "./components/Features";
import { ProductShowcase } from "./components/ProductShowcase";
import { HowItWorks } from "./components/HowItWorks";
import { Benefits } from "./components/Benefits";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { ContactFormModal } from "./components/ContactFormModal";
import { IntroSplash } from "./components/IntroSplash";

export default function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {showIntro && <IntroSplash onFinish={() => setShowIntro(false)} />}
      <ContactFormModal open={formOpen} onOpenChange={setFormOpen} />
      <Navigation onOpenForm={() => setFormOpen(true)} />
      <Hero onOpenForm={() => setFormOpen(true)} />
      {/* <TrustedBy /> */}
      <Features />
      <ProductShowcase />
      <HowItWorks />
      <Benefits />
      <Pricing onOpenForm={() => setFormOpen(true)} />
      <Testimonials />
      <FinalCTA onOpenForm={() => setFormOpen(true)} />
      <Footer />
    </div>
  );
}
