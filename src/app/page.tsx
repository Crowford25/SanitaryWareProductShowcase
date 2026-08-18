import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero from "@/components/sections/Hero";
import BrandIntro from "@/components/sections/BrandIntro";
import Collections from "@/components/sections/Collections";
import HorizontalCollection from "@/components/sections/HorizontalCollection";
import ProductStory from "@/components/sections/ProductStory";
import Materials from "@/components/sections/Materials";
import Transformation from "@/components/sections/Transformation";
import ProductCustomizer from "@/components/sections/ProductCustomizer";
import Craftsmanship from "@/components/sections/Craftsmanship";
import Statistics from "@/components/sections/Statistics";
import Projects from "@/components/sections/Projects";
import FullBleedTransition from "@/components/sections/FullBleedTransition";
import Marquee from "@/components/sections/Marquee";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <BrandIntro />
        <Collections />
        <HorizontalCollection />
        <ProductStory />
        <Materials />
        <Transformation />
        <ProductCustomizer />
        <Craftsmanship />
        <Statistics />
        <Projects />
        <FullBleedTransition />
        <Marquee />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
