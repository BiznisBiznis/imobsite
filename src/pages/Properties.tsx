import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlidersHorizontal, X, LoaderCircle, ServerCrash } from "lucide-react";
import Navigation from "../components/Navigation";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";
import { useProperties } from "../hooks/useApi";
import { Property } from "../types/api";

const Properties = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, isError, error, page, setPage, totalPages } =
    useProperties();

  // Fallback data when API is not available
  const fallbackProperties: Property[] = [
    {
      id: "1",
      title: "Garsonieră ultracentral",
      price: 61000,
      location: "București",
      area: 35,
      rooms: 1,
      type: "Apartament cu 1 camera de vânzare",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl:
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      badges: ["Nou", "Redus"],
    },
    {
      id: "2",
      title: "Apartament 2 camere, modern",
      price: 85000,
      location: "Cluj-Napoca",
      area: 55,
      rooms: 2,
      type: "Apartament cu 2 camere de vânzare",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl:
        "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=400",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      badges: ["Exclusivitate"],
    },
    {
      id: "3",
      title: "Casă cu grădină",
      price: 120000,
      location: "Timișoara",
      area: 120,
      rooms: 4,
      type: "Casă de vânzare",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl:
        "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=400",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      badges: ["Gradină"],
    },
  ];

  // Safely extract properties array from API response
  let properties: Property[] = [];

  try {
    // Handle different possible API response structures
    if (data?.data?.data && Array.isArray(data.data.data)) {
      properties = data.data.data;
    } else if (data?.data && Array.isArray(data.data)) {
      properties = data.data;
    } else if (Array.isArray(data)) {
      properties = data;
    }
  } catch (error) {
    console.warn("Error parsing properties data:", error);
    properties = [];
  }

  // Ensure displayProperties is always an array
  const displayProperties =
    !properties || properties.length === 0 || isError
      ? fallbackProperties
      : properties;

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
    if (isLoading) {
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
        </div>
      );
    }

    return (
      <>
        {/* Properties Grid with Better Spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8">
          {Array.isArray(displayProperties) ? (
            displayProperties.map((property: Property, index: number) => (
              <div
                key={property.id}
                className="transform transition-all duration-300 hover:scale-[1.02] hover:z-10"
              >
                <PropertyCard
                  {...property}
                  index={index}
                  onClick={() => handlePropertyClick(property.id)}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-16 col-span-full">
              <div className="bg-white rounded-xl border border-red-200 p-8 shadow-lg max-w-md mx-auto">
                <p className="text-red-600 font-medium mb-2">
                  Eroare la încărcarea proprietăților
                </p>
                <p className="text-sm text-gray-500">
                  Datele nu sunt în formatul așteptat.
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Type: {typeof displayProperties}
                </p>
              </div>
            </div>
          )}
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
      </>
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
              Oferte imobiliare Casa Vis
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
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
              <PropertyFilters />
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
