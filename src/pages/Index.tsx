import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DESIGN_CONFIG, COMPANY_CONFIG } from "@/config/app";
import Navigation from "../components/Navigation";
import PropertySearch from "../components/PropertySearch";
import WhatsAppButton from "../components/WhatsAppButton";
import PropertyCarousel from "../components/PropertyCarousel";
import Footer from "../components/Footer";
import { propertyService } from "@/services/api";
import type { Property } from "@/types/api";

const Index = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await propertyService.getAll(1, 6); // Fetch first 6 properties for the carousel
        setProperties(response.data.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/18788673/pexels-photo-18788673.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=1')`,
          }}
        />

        {/* Red Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-red-800/70" />

        {/* Content */}
        <div className="relative z-10 flex items-center min-h-screen pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-32 mb-28">
            <div className="max-w-4xl">
              {/* Main Heading - Left Aligned */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight pl-12">
                Casa Vis
              </h1>

              <p className="text-xl sm:text-2xl text-white mb-8 max-w-2xl leading-relaxed">
                {COMPANY_CONFIG.tagline}. Găsiți proprietatea perfectă sau
                vindețo la cel mai bun preț.
              </p>

              {/* Property Search Component */}
              <PropertySearch />
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Property Carousel Section */}
      <PropertyCarousel properties={properties} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
