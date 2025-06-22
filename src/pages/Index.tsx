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
        // Set fallback properties when API fails
        setProperties([
          {
            id: "1",
            title: "Garsonieră ultracentral",
            price: 61000,
            location: "București",
            area: 35,
            rooms: 1,
            type: "Apartament cu 1 camera de vânzare",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnailUrl:
              "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            badges: ["Nou", "Redus"],
          },
          {
            id: "2",
            title: "Apartament 2 camere, modern",
            price: 85000,
            location: "Cluj-Napoca",
            area: 55,
            rooms: 2,
            type: "Apartament cu 2 camere de vânzare",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnailUrl:
              "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=400",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            badges: ["Exclusivitate"],
          },
          {
            id: "3",
            title: "Casă cu grădină",
            price: 120000,
            location: "Timișoara",
            area: 120,
            rooms: 4,
            type: "Casă de vânzare",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnailUrl:
              "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=400",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            badges: ["Gradină"],
          },
        ]);
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
