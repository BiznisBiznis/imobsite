import { MapPin } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export interface PropertyCardData {
  id: string;
  title: string;
  price: number;
  currency: string;
  location: string;
  area: number;
  rooms?: number;
  type: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  badges?: string[];
}

interface PropertyCardProps {
  property: PropertyCardData;
  index: number;
  onClick?: (e: React.MouseEvent) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  index,
  onClick,
}) => {
  // Parse badges if it's a string, or use as is if it's an array, or default to empty array
  const getBadges = () => {
    if (!property.badges) return [];
    if (Array.isArray(property.badges)) return property.badges;
    try {
      // If it's a string, try to parse it as JSON
      if (typeof property.badges === 'string') {
        return JSON.parse(property.badges) || [];
      }
      return [];
    } catch (e) {
      console.error('Error parsing badges:', e);
      return [];
    }
  };

  const badges = getBadges();
  
  const {
    id,
    title,
    price,
    currency = "€",
    location,
    area,
    rooms,
    type,
    videoUrl,
    thumbnailUrl,
  } = property;
  return (
    <div
      className="bg-white border-2 border-slate-900 rounded-xl shadow-xl property-card-hover luxury-shadow group overflow-hidden w-full h-[500px] flex flex-col property-card cursor-pointer"
      onClick={(e: React.MouseEvent) => onClick?.(e)}
    >
      {/* Video Player - Taller Section */}
      <div className="relative rounded-t-xl overflow-hidden h-[420px]">
        <VideoPlayer
          videoUrl={videoUrl}
          thumbnailUrl={thumbnailUrl}
          className="w-full h-full object-cover"
          aspectRatio="mobile"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            // Video își gestionează propriul play/pause
          }}
        />

        {/* Badges Overlay - Only show if badges exist */}
        {badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1 pointer-events-none">
            {badges.map((badge, badgeIndex) => (
              <Badge
                key={badgeIndex}
                variant="secondary"
                className="bg-red-600/95 text-white text-xs font-medium backdrop-blur-sm px-2 py-1 rounded"
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Property Information - Minimal with Title */}
      <div className="p-2.5 text-slate-900">
        {/* Property Title */}
        <h3 className="text-xs font-medium text-slate-700 mb-1.5 line-clamp-1">
          {title}
        </h3>
        
        <div className="flex items-center justify-between mb-1.5">
          {/* Price */}
          <div className="text-base font-bold text-red-600">
            {price.toLocaleString()} {currency}
          </div>
          
          {/* Property Details */}
          <div className="flex items-center gap-2 text-xs text-slate-600">
            {area > 0 && <span className="bg-slate-100 px-2 py-0.5 rounded">{area} mp</span>}
            {rooms && rooms > 0 && <span className="bg-slate-100 px-2 py-0.5 rounded">{rooms} camere</span>}
          </div>
        </div>

        {/* Details Button - Smaller */}
        <button 
          className="w-full py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick(e);
          }}
        >
          Vezi Detalii
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
