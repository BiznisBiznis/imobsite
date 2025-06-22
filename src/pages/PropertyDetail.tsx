import { useParams, useNavigate } from "react-router-dom";
import { useProperty } from "@/hooks/useApi";
import { getYouTubeEmbedUrl } from "@/lib/utils";
import { useState } from "react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RelatedProperties from "@/components/RelatedProperties";
import BackToProperties from "@/components/BackToProperties";

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
  ChevronRight,
} from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: propertyData, isLoading, isError } = useProperty(id || "");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin text-red-600 w-12 h-12" />
      </div>
    );
  }

  if (isError || !propertyData?.success) {
    return (
      <div className="min-h-screen bg-slate-50">
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

  // Prepare media items (video + images)
  const mediaItems = [];

  if (embedUrl) {
    mediaItems.push({
      type: "video",
      content: embedUrl,
      thumbnail: property.thumbnailUrl,
    });
  }

  // Add placeholder images if no real images
  if (!property.images || property.images.length === 0) {
    for (let i = 1; i <= 3; i++) {
      mediaItems.push({
        type: "image",
        content: `https://images.pexels.com/photos/${106399 + i}/pexels-photo-${106399 + i}.jpeg?auto=compress&cs=tinysrgb&w=800`,
        thumbnail: `https://images.pexels.com/photos/${106399 + i}/pexels-photo-${106399 + i}.jpeg?auto=compress&cs=tinysrgb&w=400`,
      });
    }
  } else {
    property.images.forEach((image) => {
      mediaItems.push({
        type: "image",
        content: image.url,
        thumbnail: image.url,
      });
    });
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length,
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ro-RO").format(price);
  };

  const currentMedia = mediaItems[currentImageIndex];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Main Content */}
      <div className="pt-16 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-screen">
          {/* Left Column - Media Gallery */}
          <div className="lg:col-span-2 relative bg-black">
            {currentMedia && (
              <>
                {currentMedia.type === "video" ? (
                  <iframe
                    src={currentMedia.content}
                    className="w-full h-full"
                    title="Property Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={currentMedia.content}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Navigation Controls */}
                {mediaItems.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {mediaItems.length}
                    </div>

                    {/* Media Type Indicator */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      {currentMedia.type === "video" && (
                        <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          Video
                        </div>
                      )}
                      {currentMedia.type === "image" && (
                        <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          Hartă
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Right Column - Property Info & Agent */}
          <div className="bg-slate-900 text-white p-6 overflow-y-auto">
            {/* Property Title & Basic Info */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-2 leading-tight tracking-tight">
                {property.title}
              </h1>

              {/* Location */}
              <div className="flex items-center gap-2 text-slate-300 mb-4">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{property.location}</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-white mb-4 tracking-tight">
                € {formatPrice(property.price)}
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-slate-300">
                  <Ruler className="w-4 h-4" />
                  <span className="text-sm">{property.area} mp</span>
                </div>
                {property.rooms && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Bed className="w-4 h-4" />
                    <span className="text-sm">{property.rooms} camere</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-300">
                  <Building className="w-4 h-4" />
                  <span className="text-sm">{property.type}</span>
                </div>
              </div>

              {/* Badges */}
              {property.badges && property.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {property.badges.map((badge, index) => (
                    <Badge
                      key={index}
                      className="bg-red-600 text-white text-xs px-2 py-1 rounded"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Agent Section */}
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Agent imobiliar
              </h3>

              <div className="bg-slate-800 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    AB
                  </div>
                  <div>
                    <div className="font-semibold text-white">Andrei Bicer</div>
                    <div className="text-sm text-slate-400">
                      Agent imobiliar
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-2">
                  <a
                    href="tel:+40725502342"
                    className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded transition-all duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    +40 725 502 342
                  </a>

                  <a
                    href="https://wa.me/40725502342"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="text-xs text-slate-400 bg-slate-800 p-3 rounded">
                <p className="mb-2">
                  Sunt de acord cu{" "}
                  <a
                    href="/politica-confidentialitate"
                    className="text-red-400 underline"
                  >
                    politica de confidențialitate
                  </a>
                </p>
                <p>
                  Prin contactarea agentului, accepți să fii contactat prin
                  telefon, email sau WhatsApp pentru această proprietate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Properties Section - Bottom of page */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Properties Button */}
          <div className="text-center mb-12">
            <button
              onClick={() => navigate("/proprietati")}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl tracking-wide uppercase"
            >
              <ChevronLeft className="w-4 h-4" />
              Întoarce-te la Proprietăți
            </button>
          </div>

          {/* Related Properties */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">
              Te-ar putea interesa și
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>

          <RelatedProperties currentPropertyId={property.id} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
