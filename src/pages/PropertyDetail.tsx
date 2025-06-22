import { useParams, useNavigate } from "react-router-dom";
import { useProperty } from "@/hooks/useApi";
import { getYouTubeEmbedUrl } from "@/lib/utils";
import { useState } from "react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedProperties from "@/components/RelatedProperties";
import { COMPANY_CONFIG } from "@/config/app";

import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Ruler,
  Bed,
  Bath,
  Building,
  Phone,
  MessageCircle,
  LoaderCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: propertyData, isLoading, isError } = useProperty(id || "");
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin text-red-600 w-12 h-12" />
      </div>
    );
  }

  if (isError || !propertyData?.success) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex flex-col justify-center items-center h-screen text-center px-4">
          <AlertTriangle className="w-16 h-16 text-red-600 mb-4" />
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Eroare la încărcarea proprietății
          </h2>
          <p className="text-slate-600 mb-6 max-w-md">
            Nu am putut încărca detaliile. Te rugăm să încerci din nou.
          </p>
          <button
            onClick={() => navigate("/proprietati")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Înapoi la Proprietăți
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const property = propertyData.data;
  const embedUrl = getYouTubeEmbedUrl(property.videoUrl || "");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ro-RO").format(price);
  };

  // Mock description for now
  const fullDescription = `Va propun spre inchiriere un apartament de 2 camere pe Strada Tuzla la intersectie cu Strada Polyvaci foarte aproape de Bulevardul Lacul Tei, cu acces facil catre Barbu Vacarescu si Pipera. Ca puncte de interes enumerand: Scoala Generala 323, Gradinita cu Program Prelungit Nr. 49, Parcul Circului, Sala Palatul, Piața Obor, Mega Mall, Baneasa Shopping City, Promenada Mall, parcuri si multe altele.`;

  const shortDescription = fullDescription.substring(0, 150) + "...";

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Back Button */}
      <div className="bg-slate-900 text-white py-3">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => navigate("/proprietati")}
            className="flex items-center gap-2 text-white hover:text-red-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Înapoi la Proprietăți</span>
          </button>
        </div>
      </div>

      <div className="pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Main Content - Single Column */}
          <div className="max-w-4xl mx-auto">
              {/* Property Title */}
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4 leading-tight tracking-tight">
                  {property.title}
                </h1>
              </div>

              {/* Video Section */}
              {embedUrl && (
                <div className="mb-6">
                  <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                    <iframe
                      src={embedUrl}
                      className="w-full h-full"
                      title="Property Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Property Description */}
              <div className="mb-8">
                <p className="text-slate-700 leading-relaxed mb-4">
                  {showFullDescription ? fullDescription : shortDescription}
                </p>

                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                >
                  {showFullDescription ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Citește mai puțin
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Citește mai mult
                    </>
                  )}
                </button>
              </div>

              {/* Property Details */}
              <div className="bg-slate-50 rounded-lg p-6 mb-8">
                {/* Price */}
                <div className="text-3xl font-bold text-slate-800 mb-6 tracking-tight">
                  € {formatPrice(property.price)}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-2">
                      <Ruler className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-sm text-slate-600">Suprafață</div>
                    <div className="font-semibold text-slate-800">
                      {property.area} mp
                    </div>
                  </div>

                  {property.rooms && (
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                        <Bed className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-sm text-slate-600">Camere</div>
                      <div className="font-semibold text-slate-800">
                        {property.rooms}
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                      <Building className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-sm text-slate-600">Tip</div>
                    <div className="font-semibold text-slate-800 text-xs">
                      {property.type}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-sm text-slate-600">Locație</div>
                    <div className="font-semibold text-slate-800 text-xs">
                      {property.location}
                    </div>
                  </div>
                </div>

                {/* Badges */}
                {property.badges && property.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {property.badges.map((badge, index) => (
                      <Badge
                        key={index}
                        className="bg-red-600 text-white text-xs px-3 py-1 rounded-full"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Agent */}
            <div className="lg:col-span-1">
              <div className="bg-white border-2 border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Agent imobiliar
                </h3>

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {COMPANY_CONFIG.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">
                        {COMPANY_CONFIG.name}
                      </div>
                      <div className="text-sm text-slate-600">
                        {COMPANY_CONFIG.tagline}
                      </div>
                    </div>
                  </div>

                  {/* Contact Number Display */}
                  <div className="text-2xl font-bold text-slate-800 mb-1">
                    {COMPANY_CONFIG.contact.phone}
                  </div>
                  <div className="text-sm text-slate-600 mb-6">
                    Solicită chiar acum o vizionare
                  </div>

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <a
                      href={`tel:${COMPANY_CONFIG.contact.phone}`}
                      className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                    >
                      <Phone className="w-4 h-4" />
                      Telefon
                    </a>

                    <a
                      href={`https://wa.me/${COMPANY_CONFIG.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section before Related Properties */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
            Găsește-ți casa perfectă
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Descoperă proprietăți excepționale cu ajutorul experților noștri.
            Suntem alături de tine în fiecare pas al procesului.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/proprietati")}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Vezi toate proprietățile
            </button>
            <a
              href={`tel:${COMPANY_CONFIG.contact.phone}`}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
            >
              Contactează-ne
            </a>
          </div>
        </div>
      </div>

      {/* Related Properties Section - 4 smaller videos */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">
              Te-ar putea interesa și
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>

          {/* 4 smaller property cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <RelatedProperties currentPropertyId={property.id} maxItems={4} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;