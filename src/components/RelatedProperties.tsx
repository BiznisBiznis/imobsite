import { useNavigate } from "react-router-dom";
import { useProperties } from "@/hooks/useApi";
import PropertyCard from "./PropertyCard";
import { LoaderCircle } from "lucide-react";

interface RelatedPropertiesProps {
  currentPropertyId: string;
  city: string;
}

const RelatedProperties = ({ currentPropertyId, city }: RelatedPropertiesProps) => {
  const navigate = useNavigate();
  // Fetch 4 properties from the same city to have 3 to show after filtering
  const { data: propertiesResponse, isLoading, isError } = useProperties(1, 4, { city });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <LoaderCircle className="animate-spin text-red-600 w-8 h-8" />
      </div>
    );
  }

  if (isError || !propertiesResponse?.data) {
    return null; // Or show an error message
  }

  const relatedProperties = propertiesResponse.data.data
    .filter((p) => p.id !== currentPropertyId)
    .slice(0, 3);

  if (relatedProperties.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Te-ar putea interesa și
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProperties.map((property, index) => (
          <PropertyCard
            key={property.id}
            {...property}
            index={index}
            onClick={() => navigate(`/proprietate/${property.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProperties;
