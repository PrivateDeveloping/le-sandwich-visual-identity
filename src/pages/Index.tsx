import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedSection from "@/components/FeaturedSection";
import MenuSection from "@/components/MenuSection";
import PromosSection from "@/components/PromosSection";
import WhySection from "@/components/WhySection";
import GallerySection from "@/components/GallerySection";
import LocationsSection from "@/components/LocationsSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <FeaturedSection />
      <MenuSection />
      <PromosSection />
      <WhySection />
      <GallerySection />
      <LocationsSection />
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
