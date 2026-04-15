import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";
import GlitterCursor from "@/components/GlitterCursor";
import FloatingStickers from "@/components/FloatingStickers";

const Index = () => {
  return (
    <div className="relative overflow-x-hidden">
      <GlitterCursor />
      <FloatingStickers />
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <Footer />
    </div>
  );
};

export default Index;
