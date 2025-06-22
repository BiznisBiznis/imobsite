import { Phone, Mail, MapPin, Map } from "lucide-react";
import { COMPANY_CONFIG, DESIGN_CONFIG } from "@/config/app";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const openInMaps = () => {
    const coords = COMPANY_CONFIG.address.coordinates;
    const url = `https://www.google.com/maps/search/?api=1&query=${coords}`;
    window.open(url, "_blank");
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Column - Company Info & Contact */}
          <div className="md:col-span-2 space-y-6">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {COMPANY_CONFIG.logoImage ? (
                  <img
                    src={COMPANY_CONFIG.logoImage}
                    alt={`${COMPANY_CONFIG.name} Logo`}
                    className="rounded-lg object-contain"
                    style={{
                      width: COMPANY_CONFIG.logoSize.width,
                      height: COMPANY_CONFIG.logoSize.height,
                    }}
                  />
                ) : (
                  <div
                    className="flex items-center justify-center text-white text-lg font-medium rounded-lg"
                    style={{
                      backgroundColor: DESIGN_CONFIG.colors.primary,
                      width: COMPANY_CONFIG.logoSize.width,
                      height: COMPANY_CONFIG.logoSize.height,
                    }}
                  >
                    {COMPANY_CONFIG.logoText}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold">{COMPANY_CONFIG.name}</h3>
                  <p className="text-sm text-gray-400">
                    {COMPANY_CONFIG.tagline}
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Experți în domeniul imobiliar cu experiență vastă în vânzarea
                proprietăților. Vă oferim consultanță profesională și servicii
                de calitate.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <a
                    href={`tel:${COMPANY_CONFIG.contact.phone}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {COMPANY_CONFIG.contact.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <a
                    href={`mailto:${COMPANY_CONFIG.contact.email}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {COMPANY_CONFIG.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Location & Map */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              Locația Noastră
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <div>{COMPANY_CONFIG.address.street}</div>
                  <div>
                    {COMPANY_CONFIG.address.city}{" "}
                    {COMPANY_CONFIG.address.postalCode}
                  </div>
                  <div>{COMPANY_CONFIG.address.country}</div>
                </div>
              </div>

              {/* Embedded Map */}
              <div className="mt-3">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2742.123456789!2d26.766642989378298!3d46.24855786048749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDE0JzU0LjgiTiAyNsKwNDUnNTkuOSJF!5e0!3m2!1sen!2sro!4v1234567890123!5m2!1sen!2sro"
                  width="100%"
                  height="160"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-lg"
                  title="Locația noastră"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              Navigare Rapidă
            </h4>
            <div className="space-y-2">
              <a
                href="/"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Acasă
              </a>
              <a
                href="/proprietati"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Proprietăți
              </a>
              <a
                href="/echipa"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Echipa Noastră
              </a>
              <a
                href="/contact"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} {COMPANY_CONFIG.name}. Toate drepturile
              rezervate.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Politica de Confidențialitate
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Termeni și Condiții
              </a>
              <a href="#" className="hover:text-white transition-colors">
                GDPR
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
