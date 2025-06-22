import { MapPin } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  currency?: string;
  location: string;
  area: number;
  rooms?: number;
  type: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  badges?: string[];
  index: number;
  onClick?: () => void;
}

const PropertyCard = ({
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
  badges = [],
  index,
  onClick,
}: PropertyCardProps) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if the click wasn't on the video player
    const target = e.target as HTMLElement;
    if (!target.closest('.video-player')) {
      onClick?.();
    }
  };

  return (
    <div 
      className="bg-slate-700 rounded-lg shadow-sm property-card-hover luxury-shadow group overflow-hidden w-full h-[500px] flex flex-col property-card cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Video Player - Top Section */}
      <div className="relative rounded-t-lg overflow-hidden video-player">
        <VideoPlayer
          videoUrl={videoUrl}
          thumbnailUrl={thumbnailUrl}
          className="w-full h-[320px]"
          aspectRatio="mobile"
        />

        {/* Badges Overlay - Only show if badges exist */}
        {badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {badges.map((badge, badgeIndex) => (
              <Badge
                key={badgeIndex}
                variant="secondary"
                className="bg-red-600/95 text-white text-xs font-medium backdrop-blur-sm px-2 py-1"
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Property Information - Improved Typography */}
      <div className="px-3 pt-3 pb-3 text-gray-300 flex flex-col h-[180px] justify-between text-center">
        {/* Price - Large at top with elegant metallic font */}
        <div className="text-xl font-bold text-gray-200 mb-3 font-heading">
          {currency}
          {price.toLocaleString()}
        </div>

        {/* Property Details */}
        <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1 text-red-500" />
            {location}
          </div>
          <div>
            {area} m² {rooms ? `• ${rooms} cam` : ''}
          </div>
        </div>

        {/* Title/Description - Better font and spacing */}
        <h3
          className="text-sm text-gray-300 overflow-hidden flex-shrink-0 leading-relaxed mb-3 font-medium"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            maxHeight: "2.5rem",
          }}
        >
          {title}
        </h3>

        {/* Premium Details Button - Expensive Design */}
        <div className="flex justify-between items-center mt-auto">
          <div className="text-xs text-gray-400">
            {type}
          </div>
          <button
            className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            Detalii
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
