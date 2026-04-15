import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EditorialSection from "@/components/EditorialSection";
import ServicesSection from "@/components/ServicesSection";
import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FloatingBooking from "@/components/FloatingBooking";

const Index = () => {
  return (
    <div className="relative">
      <CustomCursor />
      <FloatingBooking />
      <Header />
      <HeroSection />
      <AboutSection />
      <EditorialSection />
      <ServicesSection />
      <ReviewSection />
      <Footer />
    </div>
  );
};

export default Index;
