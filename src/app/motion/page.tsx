import type { Metadata } from "next";
import ScrollProgress from "@/components/motion/ScrollProgress";
import MotionHero from "@/components/motion/MotionHero";
import VelocityMarquee from "@/components/motion/VelocityMarquee";
import SnapTogether from "@/components/motion/SnapTogether";
import MotionBenefits from "@/components/motion/MotionBenefits";
import TaglineReveal from "@/components/sections/TaglineReveal";
import PinnedCollection from "@/components/motion/PinnedCollection";
import StackedSteps from "@/components/motion/StackedSteps";
import MotionProof from "@/components/motion/MotionProof";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

// Design variant of the home page: same offer, dark theme, motion led.
// Kept out of search so it never competes with the home page.
export const metadata: Metadata = {
  title: "Motion edition",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export const viewport = { themeColor: "#131209" };

export default function MotionPage() {
  return (
    <>
      <ScrollProgress />
      <main id="main" className="bg-night text-on-night">
        <MotionHero />
        <VelocityMarquee />
        <SnapTogether />
        <MotionBenefits />
        <TaglineReveal tone="light" rise />
        <PinnedCollection />
        <StackedSteps />
        <MotionProof />
        <Faq tone="dark" />
        <FinalCta />
      </main>
    </>
  );
}
