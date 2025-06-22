import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Navigation from "../components/Navigation";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="pt-20 sm:pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Contactează-ne
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map Section */}
            <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2742.123456789!2d26.766642989378298!3d46.24855786048749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDE0JzU0LjgiTiAyNsKwNDUnNTkuOSJF!5e0!3m2!1sen!2sro!4v1234567890123!5m2!1sen!2sro"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-2xl"
              ></iframe>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  CASĂ VIS
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">
                        Telefon
                      </h3>
                      <a
                        href="tel:0742801123"
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        0742 801 123
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:casavis@yahoo.com"
                        className="text-red-600 hover:text-red-700"
                      >
                        casavis@yahoo.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">
                        Adresă
                      </h3>
                      <p className="text-slate-600">
                        Bulevardul Republicii 17, Onești
                      </p>
                      <a
                        href="https://maps.google.com/?q=Bulevardul+Republicii+17+Onesti"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 text-sm mt-1 inline-block"
                      >
                        Deschide în Google Maps →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Contact;
