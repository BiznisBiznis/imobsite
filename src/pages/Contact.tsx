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
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-red-100">
              <div className="h-[400px] bg-gray-200 relative">
                {/* Placeholder for Google Maps */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.8949032154613!2d26.097320315449924!3d44.43731997910206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff3c5b817e9d%3A0x20531b69b8c1bdcf!2sBulevardul%20Carol%20I%2062%2C%20Bucure%C8%99ti%2C%20Romania!5e0!3m2!1sen!2s!4v1644494850945!5m2!1sen!2s"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-8">
              {/* Main Office */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  TRÂMBIȚAȘU ESTATE
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">
                        Telefon
                      </h3>
                      <a
                        href="tel:0768111564"
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        0768 111 564
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
                        href="mailto:trimbitsau@gmail.com"
                        className="text-red-600 hover:text-red-700"
                      >
                        trimbitsau@gmail.com
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
                        Bulevardul Carol Nr. 62, București, Sector 2
                      </p>
                      <a
                        href="https://maps.google.com/?q=Bulevardul+Carol+Nr.+62,+București"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 text-sm mt-1 inline-block"
                      >
                        Deschide în Google Maps →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">
                        Program
                      </h3>
                      <div className="text-slate-600 space-y-1">
                        <p>Luni - Vineri: 09:00 - 18:00</p>
                        <p>Sâmbătă: 10:00 - 16:00</p>
                        <p>Duminică: Închis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch Office */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
                <h2 className="text-xl font-bold text-slate-800 mb-6">
                  TRÂMBIȚAȘU ESTATE CONSTANȚA
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-slate-600">
                        Bd. Alexandru Lăpușneanu nr 157, Bl. L45b parter,
                        Constanța 900336
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      <a
                        href="tel:+40775849191"
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        +40 775 849 191
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6">
                  Trimite-ne un mesaj rapid
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Numele tău"
                    className="w-full p-3 border border-red-200 rounded-lg focus:border-red-500 focus:ring-red-500 bg-slate-50"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border border-red-200 rounded-lg focus:border-red-500 focus:ring-red-500 bg-slate-50"
                  />
                  <textarea
                    placeholder="Mesajul tău"
                    rows={4}
                    className="w-full p-3 border border-red-200 rounded-lg focus:border-red-500 focus:ring-red-500 bg-slate-50 resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Trimite mesajul
                  </button>
                </form>
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
