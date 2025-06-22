import { useParams, useNavigate } from "react-router-dom";
import { useProperty, useTeamMember } from "@/hooks/useApi";
import { getYouTubeEmbedUrl } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import type { Property } from "@/types/api";

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

// Real Estate Icons
import { 
  FaBuilding, 
  FaHome, 
  FaWarehouse, 
  FaStore, 
  FaHotel, 
  FaTree, 
  FaCity, 
  FaCalendarAlt, 
  FaLayerGroup,
  FaDoorOpen,
  FaCar,
  FaSwimmingPool,
  FaParking,
  FaSnowflake,
  FaFire,
  FaWifi
} from "react-icons/fa";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: propertyData, isLoading, isError } = useProperty(id || "");
  const property = propertyData?.data as (Property & { agent?: any }) | undefined;
  
  // Use agent data from the property object if it exists
  const agent = property?.agent;
  
  // Log the property data for debugging
  useEffect(() => {
    if (property) {
      console.log('Property data:', property);
      if (agent) {
        console.log('Agent data:', agent);
      } else {
        console.log('No agent data found for this property');
      }
    }
  }, [property, agent]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const stickyRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stickyRef.current || !detailsRef.current) return;

    const stickyEl = stickyRef.current;
    const detailsEl = detailsRef.current;
    const stickyOffset = 16; // top-4 = 1rem = 16px
    
    const handleScroll = () => {
      const detailsRect = detailsEl.getBoundingClientRect();
      const stickyRect = stickyEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Calculate the bottom position of the details section relative to the viewport
      const detailsBottom = detailsRect.top + detailsRect.height;
      const stickyHeight = stickyRect.height;
      
      // Always make it sticky by default
      stickyEl.style.position = 'sticky';
      stickyEl.style.top = `${stickyOffset}px`;
      stickyEl.style.bottom = 'auto';
      
      // Only adjust if we're at the bottom of the details section
      if (detailsBottom < viewportHeight) {
        // Calculate the maximum scroll position where the sticky should stay at the bottom
        const maxScroll = detailsEl.offsetTop + detailsEl.offsetHeight - viewportHeight + stickyHeight + stickyOffset;
        
        if (scrollY >= maxScroll) {
          stickyEl.style.position = 'absolute';
          stickyEl.style.top = 'auto';
          stickyEl.style.bottom = '0';
        } else {
          stickyEl.style.position = 'sticky';
          stickyEl.style.top = `${stickyOffset}px`;
          stickyEl.style.bottom = 'auto';
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderCircle className="w-12 h-12 text-red-600 animate-spin" />
      </div>
    );
  }

  if (isError || !propertyData?.success || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-12 h-12 text-red-600 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Eroare la încărcare</h2>
        <p className="text-slate-600 mb-6 text-center">
          A apărut o eroare la încărcarea detaliilor proprietății. Vă rugăm să încercați din nou.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Reîncarcă pagina
        </button>
      </div>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(property.videoUrl || "");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ro-RO").format(price);
  };

  // Use the property's description or a default message if not available
  const fullDescription = property.description || "Nu există descriere disponibilă pentru această proprietate.";
  const shortDescription = fullDescription.length > 150 
    ? fullDescription.substring(0, 150) + "..." 
    : fullDescription;

  // Get property type icon
  const getPropertyTypeIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    const iconClass = "w-6 h-6 text-gray-800";
    
    if (lowerType.includes('garsonier') || lowerType.includes('1 camer')) {
      return <FaHome className={iconClass} />;
    } else if (lowerType.includes('2 camer')) {
      return <FaHome className={iconClass} />;
    } else if (lowerType.includes('3 camer')) {
      return <FaHome className={iconClass} />;
    } else if (lowerType.includes('4+ camer')) {
      return <FaHome className={iconClass} />;
    } else if (lowerType.includes('casa') || lowerType.includes('vil')) {
      return <FaHome className={iconClass} />;
    } else if (lowerType.includes('teren')) {
      return <FaTree className={iconClass} />;
    } else if (lowerType.includes('comercial') || lowerType.includes('spațiu')) {
      return <FaStore className={iconClass} />;
    } else if (lowerType.includes('birou')) {
      return <FaBuilding className={iconClass} />;
    } else if (lowerType.includes('depozit') || lowerType.includes('hala')) {
      return <FaWarehouse className={iconClass} />;
    } else {
      return <FaHome className={iconClass} />;
    }
  };

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2">
              {/* Property Title */}
              <div className="mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2 leading-tight tracking-tight">
                  {property.title}
                </h1>
                <div className="text-2xl font-bold text-red-600">
                  € {formatPrice(property.price)}
                </div>
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
              <div ref={detailsRef} className="bg-slate-50 rounded-lg p-6 mb-8">
                {/* Badges */}
                {(() => {
                  // Helper function to parse badges from string or use as array
                  const parseBadges = (badges: string | string[] | undefined): string[] => {
                    if (!badges) return [];
                    if (Array.isArray(badges)) return badges;
                    try {
                      return JSON.parse(badges) || [];
                    } catch (e) {
                      console.error('Error parsing badges:', e);
                      return [];
                    }
                  };
                  
                  const badgeList = parseBadges(property.badges);
                  
                  if (badgeList.length === 0) return null;
                  
                  return (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {badgeList.map((badge, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  );
                })()}

                {/* Details Icons - Single Row */}
                <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
                  {/* Property Type */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-gray-800 mx-auto mb-2">
                      {getPropertyTypeIcon(property.type)}
                    </div>
                    <div className="text-sm text-slate-600">Tip</div>
                    <div className="font-semibold text-slate-800 text-sm">
                      {property.type}
                    </div>
                  </div>

                  {/* Area */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-gray-800 mx-auto mb-2">
                      <Ruler className="w-6 h-6 text-gray-800" />
                    </div>
                    <div className="text-sm text-slate-600">Suprafață</div>
                    <div className="font-semibold text-slate-800">
                      {property.area} m²
                    </div>
                  </div>

                  {/* Floor - Hide for land properties */}
                  {property.type.toLowerCase() !== 'teren' && (property.floor || property.floor === 0) && (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-gray-800 mx-auto mb-2">
                        <FaLayerGroup className="w-5 h-5 text-gray-800" />
                      </div>
                      <div className="text-sm text-slate-600">Etaj</div>
                      <div className="font-semibold text-slate-800">
                        {property.floor === 0 ? 'Parter' : property.floor}
                        {property.totalFloors ? `/${property.totalFloors}` : ''}
                      </div>
                    </div>
                  )}

                  {/* Rooms - Hide for land properties */}
                  {property.type.toLowerCase() !== 'teren' && property.rooms && property.rooms > 0 && (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-gray-800 mx-auto mb-2">
                        <Bed className="w-6 h-6 text-gray-800" />
                      </div>
                      <div className="text-sm text-slate-600">
                        {property.rooms === 1 ? 'Cameră' : 'Camere'}
                      </div>
                      <div className="font-semibold text-slate-800">
                        {property.rooms}
                      </div>
                    </div>
                  )}

                  {/* Year Built - Only show for non-land properties */}
                  {property.type.toLowerCase() !== 'teren' && (property.yearBuilt || property.yearBuilt === 0) && (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-gray-800 mx-auto mb-2">
                        <FaCalendarAlt className="w-5 h-5 text-gray-800" />
                      </div>
                      <div className="text-sm text-slate-600">An construcție</div>
                      <div className="font-semibold text-slate-800">
                        {property.yearBuilt}
                      </div>
                    </div>
                  )}
                </div>


              </div>
            </div>

            {/* Sidebar - Agent - With precise sticky behavior */}
            <div className="lg:col-span-1 lg:mt-[calc(4rem+1.5rem)] relative" style={{ height: 'fit-content' }}>
              <div 
                ref={stickyRef}
                className="bg-white border-2 border-red-200 rounded-xl p-6 transition-all duration-300 w-full"
                style={{ maxHeight: 'calc(100vh - 2rem)', overflowY: 'auto' }}
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Agent imobiliar
                </h3>

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    {agent?.id ? (
                      <>
                        <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center overflow-hidden">
                          {agent.image ? (
                            <img 
                              src={agent.image} 
                              alt={agent.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to initials if image fails to load
                                e.currentTarget.style.display = 'none';
                                const initials = agent.name
                                  .split(" ")
                                  .map((word) => word[0])
                                  .join("");
                                const fallback = document.createElement('span');
                                fallback.className = 'text-white font-bold text-lg';
                                fallback.textContent = initials;
                                e.currentTarget.parentNode.appendChild(fallback);
                              }}
                            />
                          ) : (
                            <span className="text-white font-bold text-lg">
                              {agent.name?.split(" ").map((word) => word[0]).join("") || 'A'}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">
                            {agent.name || 'Agent'}
                          </div>
                          <div className="text-sm text-slate-600">
                            {agent.role || 'Agent imobiliar'}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>

                  {/* Contact Number Display */}
                  <div className="text-2xl font-bold text-slate-800 mb-1">
                    {agent?.phone || COMPANY_CONFIG.contact.phone}
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
                      href={`https://wa.me/${agent?.phone ? agent.phone.replace(/[^0-9]/g, '') : COMPANY_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                        `Bună! Sunt interesat de proprietatea "${property.title}" de pe site-ul dumneavoastră.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Properties Section - 4 smaller videos */}
      <div className="bg-slate-50 pt-4 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">
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
