import { faqs, showroomLead } from "@/lib/content";
import Hero from "@/components/sections/Hero";
import LogoStrip from "@/components/sections/LogoStrip";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Benefits from "@/components/sections/Benefits";
import TaglineReveal from "@/components/sections/TaglineReveal";
import Collection from "@/components/sections/Collection";
import HowItWorks from "@/components/sections/HowItWorks";
import Proof from "@/components/sections/Proof";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <LogoStrip />
      <ProblemSolution />
      <Benefits />
      <TaglineReveal signedBy={`${showroomLead.name}, ${showroomLead.role}`} />
      <Collection />
      <HowItWorks />
      <Proof />
      <Faq index="06" />
      <FinalCta index="07" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
    </main>
  );
}
