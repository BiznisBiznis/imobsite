import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import type { Property } from "@/types/api";

interface PropertyCarouselProps {
  properties: Property[];
}

const PropertyCarousel = ({ properties }: PropertyCarouselProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || properties.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % properties.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, properties.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? properties.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % properties.length);
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/proprietate/${propertyId}`);
  };

  const handleTeamClick = () => {
    navigate("/echipa");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  if (properties.length === 0) {
    return (
      <section className="bg-gray-100 pt-px pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Anunțuri Recomandate
          </h2>
          <p className="text-gray-600">
            Momentan nu sunt anunțuri disponibile.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 pt-px pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop & Mobile Layout */}
        <div className="relative">
          {/* Desktop Grid - Show 4 videos */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6 pt-8">
            {properties.map((property) => (
              <div key={property.id}>
                <div className="bg-white border-2 border-slate-900 shadow-xl overflow-hidden h-full">
                  {/* Video Section - Portrait Format */}
                  <div className="relative">
                    <div
                      onClick={() => handlePropertyClick(property.id)}
                      className="cursor-pointer"
                    >
                      <VideoPlayer
                        videoUrl={property.videoUrl}
                        thumbnailUrl={property.thumbnailUrl}
                        className="w-full h-[480px] object-cover"
                        aspectRatio="standard"
                      />
                    </div>
                  </div>

                  {/* Property Information */}
                  <div className="p-2 text-center">
                    <div className="text-xl font-bold text-slate-900 mb-1 tracking-tight">
                      {property.price.toLocaleString()} €
                    </div>
                    <h3 className="text-sm font-medium text-slate-700 mb-3 leading-relaxed tracking-wide">
                      {property.title}
                    </h3>

                    <button
                      onClick={() => handlePropertyClick(property.id)}
                      className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 tracking-wide uppercase border border-red-500/20 min-w-[100px]"
                    >
                      Vezi Detalii
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="lg:hidden pt-8">
            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Anunțuri Recomandate
            </h2>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
              aria-label="Proprietatea anterioară"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
              aria-label="Proprietatea următoare"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Mobile Properties Display */}
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {properties.map((property) => (
                  <div key={property.id} className="w-full flex-shrink-0 px-2">
                    <div className="bg-white border-2 border-slate-900 shadow-xl overflow-hidden">
                      {/* Video Section - Portrait Format */}
                      <div className="relative">
                        <div
                          onClick={() => handlePropertyClick(property.id)}
                          className="cursor-pointer"
                        >
                          <VideoPlayer
                            videoUrl={property.videoUrl}
                            thumbnailUrl={property.thumbnailUrl}
                            className="w-full h-[540px] object-cover"
                            aspectRatio="standard"
                          />
                        </div>
                      </div>

                      {/* Property Information */}
                      <div className="p-2 text-center">
                        <div className="text-xl font-bold text-slate-900 mb-1 tracking-tight">
                          {property.price.toLocaleString()} €
                        </div>
                        <h3 className="text-sm font-medium text-slate-700 mb-3 leading-relaxed tracking-wide">
                          {property.title}
                        </h3>

                        <button
                          onClick={() => handlePropertyClick(property.id)}
                          className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 tracking-wide uppercase border border-red-500/20 min-w-[100px]"
                        >
                          Vezi Detalii
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {properties.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-red-600 scale-125"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Proprietatea ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Premium Action Buttons */}
        <div className="flex justify-center gap-8 mt-16">
          <button
            onClick={handleTeamClick}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-5 px-16 rounded-md text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl font-primary tracking-wider uppercase border border-red-500/20 min-w-[160px]"
          >
            Echipa
          </button>

          <button
            onClick={handleContactClick}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-5 px-16 rounded-md text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl font-primary tracking-wider uppercase border border-red-500/20 min-w-[160px]"
          >
            Contact
          </button>
        </div>
      </div>
    </section>
  );
};

export default PropertyCarousel;
