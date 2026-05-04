import { Hero } from "./_components/hero";
import { Features } from "./_components/features";
import { HowItWorks } from "./_components/how-it-works";
import { SupportedContent } from "./_components/supported-content";
import { WhySnapSave } from "./_components/why-snapsave";
import { Testimonials } from "./_components/testimonials";
import { FrequentlyAsked } from "./_components/frequently-asked";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <SupportedContent />
      <WhySnapSave />
      <Testimonials />
      <FrequentlyAsked />
    </div>
  );
}
