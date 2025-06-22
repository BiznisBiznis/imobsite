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

  const {
    data,
    isLoading,
    isError,
    error,
    page,
    setPage,
    totalPages,
  } = useProperties();

  const properties = data?.data || [];

  const handlePropertyClick = (propertyId: number) => {
    navigate(`/property/${propertyId}`);
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
          <h3 className="text-xl font-semibold mb-2">Eroare la încărcarea proprietăților</h3>
          <p className="text-center">Nu am putut prelua datele. Vă rugăm să încercați din nou mai târziu.</p>
          <p className="text-sm mt-2 font-mono bg-red-100 p-2 rounded">{error?.message}</p>
        </div>
      );
    }
    
    if (!data || data.data.length === 0) {
        return (
            <div className="text-center py-16 col-span-full">
                <p className="text-slate-500">Momentan nu sunt proprietăți disponibile.</p>
            </div>
        );
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {properties.map((property: Property, index: number) => (
            <PropertyCard
              key={property.id}
              {...property}
              index={index}
              onClick={() => handlePropertyClick(property.id)}
            />
          ))}
        </div>

        {totalPages > 1 && (
            <div className="mt-10 flex justify-center items-center gap-3">
            <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="bg-slate-700 hover:bg-slate-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 min-w-[70px] shadow-sm hover:shadow-md"
            >
                ‹ Anterior
            </button>
            <span className="text-slate-500 text-sm px-3 font-medium">
                {page} / {totalPages}
            </span>
            <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="bg-slate-700 hover:bg-slate-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 min-w-[70px] shadow-sm hover:shadow-md"
            >
                Următor ›
            </button>
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
          <div className="mb-12 sm:mb-16 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4 sm:mb-6">
              Oferte imobiliare TRÂMBIȚAȘU ESTATE
            </h1>
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg">
              Descoperă cele mai bune proprietăți din portofoliul nostru
            </p>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
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
            <div className="lg:col-span-3">
              {renderContent()}
            </div>

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
