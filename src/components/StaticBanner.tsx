import { Button } from "./ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY_CONFIG } from "@/config/app";
import { useNavigate } from "react-router-dom";

const StaticBanner = () => {
  const navigate = useNavigate();

  // Don't render if banner is disabled
  if (!COMPANY_CONFIG.banner.enabled) {
    return null;
  }

  const handleButtonClick = () => {
    if (COMPANY_CONFIG.banner.buttonLink.startsWith("/")) {
      navigate(COMPANY_CONFIG.banner.buttonLink);
    } else {
      window.open(COMPANY_CONFIG.banner.buttonLink, "_blank");
    }
  };

  return (
    <section
      className="relative py-20 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: COMPANY_CONFIG.banner.backgroundImage
          ? `url('${COMPANY_CONFIG.banner.backgroundImage}')`
          : "none",
        backgroundColor: COMPANY_CONFIG.banner.backgroundColor,
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading">
            {COMPANY_CONFIG.banner.title}
          </h2>

          <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed font-primary">
            {COMPANY_CONFIG.banner.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={handleButtonClick}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 font-primary"
            >
              {COMPANY_CONFIG.banner.buttonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <a
              href={`tel:${COMPANY_CONFIG.contact.phone}`}
              className="flex items-center gap-3 text-white hover:text-yellow-300 transition-colors text-lg font-semibold bg-white/10 hover:bg-white/20 px-8 py-4 rounded-lg backdrop-blur-sm border border-white/20 font-primary"
            >
              <Phone className="h-5 w-5" />
              {COMPANY_CONFIG.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticBanner;
