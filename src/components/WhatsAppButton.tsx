import { MessageCircle } from "lucide-react";
import { COMPANY_CONFIG, FEATURES_CONFIG } from "@/config/app";

const WhatsAppButton = () => {
  // Don't render if WhatsApp is disabled
  if (!FEATURES_CONFIG.enableWhatsApp) {
    return null;
  }

  const handleWhatsAppClick = () => {
    // Remove all non-digits and any leading +
    const phoneNumber = COMPANY_CONFIG.contact.whatsapp.replace(/[^\d]/g, "");
    const message = encodeURIComponent(
      `Bună ziua! Sunt interesat(ă) de proprietățile ${COMPANY_CONFIG.name}. Aș dori să aflu mai multe informații.`,
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Scrie-ne pe WhatsApp
      </span>
    </button>
  );
};

export default WhatsAppButton;
