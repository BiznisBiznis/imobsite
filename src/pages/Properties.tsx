import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, LoaderCircle, ServerCrash } from "lucide-react";
import Navigation from "../components/Navigation";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";
import { useProperties } from "../hooks/useApi";
import { Property } from "../types/api";

const Properties: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [areaMin, setAreaMin] = useState('');
  const [areaMax, setAreaMax] = useState('');
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);

  const { data, isLoading, isError, error, page, setPage, totalPages } =
    useProperties();
    
  // Initialize properties from API or fallback data
  useEffect(() => {
    const loadProperties = () => {
      try {
        let result: Property[] = [];
        // Handle different possible API response structures
        if (data && typeof data === 'object') {
          if ('data' in data && data.data) {
            if (Array.isArray(data.data)) {
              result = data.data;
            } else if (data.data.data && Array.isArray(data.data.data)) {
              result = data.data.data;
            }
          } else if (Array.isArray(data)) {
            result = data;
          }
        }
        
        if (result.length > 0) {
          setProperties(result);
        } else {
          // Fallback to default properties if no data from API
          setProperties(getFallbackProperties());
        }
      } catch (error) {
        console.warn("Error parsing properties data:", error);
        setProperties(getFallbackProperties());
      }
    };
    
    loadProperties();
  }, [data]);

  // Extract search parameters from URL
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    setSearchTerm(search);
    setPropertyType(type);
    
    // Set other filter states from URL
    setPriceMin(searchParams.get('priceMin') || '');
    setPriceMax(searchParams.get('priceMax') || '');
    setAreaMin(searchParams.get('areaMin') || '');
    setAreaMax(searchParams.get('areaMax') || '');
    
    const rooms = searchParams.get('rooms');
    if (rooms) {
      setSelectedRooms(rooms.split(',').map(Number));
    } else {
      setSelectedRooms([]);
    }
  }, [searchParams]);
  
  // Filter state management moved to the top with other state declarations

  // Filter properties based on search criteria
  useEffect(() => {
    if (!properties || properties.length === 0) return;
    
    setIsFiltering(true);
    
    let result = [...properties];

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(property => 
        (property.title?.toLowerCase() || '').includes(searchLower) ||
        (property.description?.toLowerCase() || '').includes(searchLower) ||
        (property.location?.toLowerCase() || '').includes(searchLower) ||
        (property.city?.toLowerCase() || '').includes(searchLower) ||
        (property.county?.toLowerCase() || '').includes(searchLower)
      );
    }

    // Filter by property type
    if (propertyType && propertyType !== 'toate') {
      const typeMap: Record<string, string> = {
        'apartament': 'apartament',
        'garsoniera': 'garsonieră',
        'casa': 'casă',
        'teren': 'teren',
        'comercial': 'comercial'
      };

      const typeToSearch = typeMap[propertyType] || propertyType;
      
      result = result.filter(property => 
        property.type?.toLowerCase().includes(typeToSearch.toLowerCase())
      );
    }
    
    // Filter by price range
    if (priceMin) {
      const minPrice = parseFloat(priceMin);
      if (!isNaN(minPrice)) {
        result = result.filter(property => property.price >= minPrice);
      }
    }
    
    if (priceMax) {
      const maxPrice = parseFloat(priceMax);
      if (!isNaN(maxPrice)) {
        result = result.filter(property => property.price <= maxPrice);
      }
    }
    
    // Filter by area
    if (areaMin) {
      const minArea = parseFloat(areaMin);
      if (!isNaN(minArea)) {
        result = result.filter(property => property.area >= minArea);
      }
    }
    
    if (areaMax) {
      const maxArea = parseFloat(areaMax);
      if (!isNaN(maxArea)) {
        result = result.filter(property => property.area <= maxArea);
      }
    }
    
    // Filter by number of rooms
    if (selectedRooms.length > 0) {
      result = result.filter(property => {
        // If 5+ is selected, include properties with 5 or more rooms
        if (selectedRooms.includes(5) && property.rooms >= 5) return true;
        // Otherwise filter by exact room count
        return selectedRooms.includes(property.rooms);
      });
    }
    
    setFilteredProperties(result);
    setIsFiltering(false);
  }, [properties, searchTerm, propertyType, priceMin, priceMax, areaMin, areaMax, selectedRooms]);

  // Fallback data when API is not available
  const getFallbackProperties = (): Property[] => {
    return [
      {
        id: "1",
        title: "Garsonieră ultracentral",
        price: 61000,
        currency: '€',
        city: "București",
        county: "București",
        location: "București, Sector 1",
        area: 35,
        rooms: 1,
        bathrooms: 1,
        type: "Apartament cu 1 camera de vânzare",
        category: "vanzare",
        status: "published",
        featured: false,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        badges: ["Nou", "Redus"],
        description: 'Garsonieră modernă în centrul orașului',
        agentId: '1',
        agent: {
          id: '1',
          name: 'Agent Imobiliar',
          email: 'agent@example.com',
          phone: '+40712345678',
          image: '/images/agent.jpg'
        },
        coordinates: { latitude: 44.4268, longitude: 26.1025 },
        publishedAt: new Date().toISOString(),
        energyClass: 'B',
        yearBuilt: 2010,
        floor: 3,
        totalFloors: 8,
        parking: false,
        amenities: [],
        images: [],
        viewsCount: 0,
        contactCount: 0
      },
      {
        id: "2",
        title: "Apartament 2 camere, modern",
        price: 85000,
        currency: '€',
        city: "Cluj-Napoca",
        county: "Cluj",
        location: "Cluj-Napoca, Zorilor",
        area: 55,
        rooms: 2,
        bathrooms: 1,
        type: "Apartament cu 2 camere de vânzare",
        category: "vanzare",
        status: "published",
        featured: true,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=400",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        badges: ["Exclusivitate"],
        description: 'Apartament modern cu 2 camere',
        agentId: '1',
        agent: {
          id: '1',
          name: 'Agent Imobiliar',
          email: 'agent@example.com',
          phone: '+40712345678',
          image: '/images/agent.jpg'
        },
        coordinates: { latitude: 46.7712, longitude: 23.6236 },
        publishedAt: new Date().toISOString(),
        energyClass: 'A',
        yearBuilt: 2018,
        floor: 2,
        totalFloors: 4,
        parking: true,
        amenities: ['balcony', 'elevator'],
        images: [],
        viewsCount: 0,
        contactCount: 0
      },
      {
        id: "3",
        title: "Casă cu grădină",
        price: 120000,
        currency: '€',
        city: "Timișoara",
        county: "Timiș",
        location: "Timișoara, Centru",
        area: 120,
        rooms: 4,
        bathrooms: 2,
        type: "Casă de vânzare",
        category: "vanzare",
        status: "published",
        featured: false,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=400",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        badges: ["Gradină"],
        description: 'Casă modernă cu grădină',
        agentId: '1',
        agent: {
          id: '1',
          name: 'Agent Imobiliar',
          email: 'agent@example.com',
          phone: '+40712345678',
          image: '/images/agent.jpg'
        },
        coordinates: { latitude: 45.7489, longitude: 21.2087 },
        publishedAt: new Date().toISOString(),
        energyClass: 'C',
        yearBuilt: 2015,
        floor: 1,
        totalFloors: 1,
        parking: true,
        amenities: ['garden', 'garage'],
        images: [],
        viewsCount: 0,
        contactCount: 0
      },
    ];
  };

  // Use filtered properties if there are any filters applied, otherwise use all properties
  const hasActiveFilters = searchTerm || propertyType || priceMin || priceMax || areaMin || areaMax || selectedRooms.length > 0;
  const displayProperties = hasActiveFilters ? 
    (filteredProperties.length > 0 ? filteredProperties : []) :
    properties;

  // Properties ready for display

  const handlePropertyClick = (propertyId: string | number) => {
    navigate(`/proprietate/${propertyId}`);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const renderContent = () => {
    if (isLoading || isFiltering) {
      return (
        <div className="flex justify-center items-center h-96 col-span-full">
          <LoaderCircle className="animate-spin text-red-600 w-12 h-12" />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex flex-col justify-center items-center h-96 bg-red-50 text-red-700 rounded-lg p-6 col-span-full">
          <ServerCrash className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Eroare la încărcarea proprietăților
          </h3>
          <p className="text-center">
            Nu am putut prelua datele. Vă rugăm să încercați din nou mai târziu.
          </p>
          <p className="text-sm mt-2 font-mono bg-red-100 p-2 rounded">
            {error?.message}
          </p>
        </div>
      );
    }

    if (!displayProperties || displayProperties.length === 0) {
      return (
        <div className="text-center py-16 col-span-full">
          <p className="text-slate-500">
            Momentan nu sunt proprietăți disponibile.
          </p>
          <button 
            onClick={() => {
              navigate('/proprietati');
              setSearchTerm('');
              setPropertyType('');
              setPriceMin('');
              setPriceMax('');
              setAreaMin('');
              setAreaMax('');
              setSelectedRooms([]);
            }}
            className="mt-4 text-red-600 hover:text-red-700 font-medium flex items-center justify-center gap-2 mx-auto"
          >
            <X className="w-4 h-4" />
            Resetează toate filtrele
          </button>
        </div>
      );
    }

    return (
      <div>
        {/* Properties Grid with Better Spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8">
          {displayProperties.map((property: Property, index: number) => (
            <div
              key={property.id}
              className="transform transition-all duration-300 hover:scale-[1.02] hover:z-10"
            >
              <PropertyCard
                property={{
                  id: property.id,
                  title: property.title,
                  price: property.price,
                  currency: property.currency || '€',
                  location: property.location || `${property.city || ''}${property.city && property.county ? ', ' : ''}${property.county || ''}`,
                  area: property.area,
                  rooms: property.rooms,
                  type: property.type,
                  videoUrl: property.videoUrl,
                  thumbnailUrl: property.thumbnailUrl,
                  badges: property.badges || []
                }}
                index={index}
                onClick={() => handlePropertyClick(property.id)}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col items-center space-y-4">
            {/* Page Info */}
            <div className="text-center">
              <p className="text-sm text-slate-600">
                Afișez pagina{" "}
                <span className="font-semibold text-slate-800">{page}</span> din{" "}
                <span className="font-semibold text-slate-800">
                  {totalPages}
                </span>
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={page === 1}
                className="group bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 min-w-[120px] shadow-md hover:shadow-lg transform hover:scale-105 disabled:hover:scale-100"
              >
                <span className="flex items-center gap-2">
                  <span>‹</span>
                  Anterior
                </span>
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 ${
                        page === pageNum
                          ? "bg-red-600 text-white shadow-lg"
                          : "bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="group bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 min-w-[120px] shadow-md hover:shadow-lg transform hover:scale-105 disabled:hover:scale-100"
              >
                <span className="flex items-center gap-2">
                  Următor
                  <span>›</span>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="pt-20 sm:pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
              {searchTerm || propertyType ? (
                `Rezultate pentru: ${searchTerm ? `"${searchTerm}"` : ''} ${propertyType ? `(${propertyType})` : ''}`
              ) : (
                'Oferte imobiliare Casa Vis'
              )}
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
            {(searchTerm || propertyType) && (
              <button 
                onClick={() => {
                  navigate('/proprietati');
                  setSearchTerm('');
                  setPropertyType('');
                }}
                className="mt-4 text-red-600 hover:text-red-700 font-medium flex items-center justify-center gap-2 mx-auto"
              >
                <X className="w-4 h-4" />
                Șterge filtrele
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-md transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-primary tracking-wide uppercase border border-red-500/20"
            >
              {showFilters ? (
                <>
                  <X className="w-5 h-5" />
                  Ascunde filtrele
                </>
              ) : (
                <>
                  <SlidersHorizontal className="w-5 h-5" />
                  Afișează filtrele
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Main Content - Properties Grid */}
            <div className="lg:col-span-3">{renderContent()}</div>

            {/* Sidebar - Filters */}
            <div
              className={`lg:col-span-1 order-first lg:order-last ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <PropertyFilters onFilterChange={() => setPage(1)} />
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Properties;
