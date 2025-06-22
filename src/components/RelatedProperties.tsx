import { useNavigate } from "react-router-dom";
import { useProperties } from "@/hooks/useApi";
import PropertyCard, { PropertyCardData } from "./PropertyCard";
import { LoaderCircle } from "lucide-react";
import type { Property } from "@/types/api";

interface RelatedPropertiesProps {
  currentPropertyId: string;
  maxItems?: number;
}

const RelatedProperties = ({
  currentPropertyId,
  maxItems = 3,
}: RelatedPropertiesProps) => {
  const navigate = useNavigate();
  // Fetch enough properties to have maxItems to show after filtering current one
  const {
    data: propertiesResponse,
    isLoading,
    isError,
  } = useProperties(1, maxItems + 2, {});

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 col-span-full">
        <LoaderCircle className="animate-spin text-red-600 w-8 h-8" />
      </div>
    );
  }

  if (isError || !propertiesResponse?.data) {
    return null; // Or show an error message
  }

  const relatedProperties: PropertyCardData[] = propertiesResponse.data.data
    .filter((p) => p.id !== currentPropertyId)
    .slice(0, maxItems)
    .map(property => ({
      id: property.id,
      title: property.title,
      price: property.price,
      currency: property.currency,
      location: `${property.city}, ${property.county}`,
      area: property.area,
      rooms: property.rooms,
      type: property.type,
      videoUrl: property.videoUrl,
      thumbnailUrl: property.thumbnailUrl,
      badges: property.badges || [],
    }));

  if (relatedProperties.length === 0) {
    return null;
  }

  return (
    <>
      {relatedProperties.map((property, index) => (
        <div
          key={property.id}
          className="transform transition-all duration-300 hover:scale-[1.02]"
        >
          <PropertyCard
            property={property}
            index={index}
            onClick={() => navigate(`/proprietate/${property.id}`)}
          />
        </div>
      ))}
    </>
  );
};

export default RelatedProperties;
