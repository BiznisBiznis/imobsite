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
  return (
    <div className="bg-slate-700 rounded-lg shadow-sm property-card-hover luxury-shadow group overflow-hidden w-full h-[500px] flex flex-col property-card">
      {/* Video Player - Top Section */}
      <div className="relative rounded-t-lg overflow-hidden">
        <VideoPlayer
          videoUrl={videoUrl}
          thumbnailUrl={thumbnailUrl}
          className="w-full h-[320px] cursor-pointer"
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

        {/* Title/Description - Better font and spacing */}
        <h3
          className="text-xs text-gray-400 overflow-hidden flex-shrink-0 leading-relaxed mb-3 font-primary"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            maxHeight: "2rem",
            fontWeight: "500",
          }}
        >
          {title}
        </h3>

        {/* Premium Details Button - Expensive Design */}
        <div className="flex justify-center">
          <button
            className="inline-flex items-center justify-center px-6 py-2 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-primary tracking-wide uppercase border border-red-500/20 min-w-[100px]"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            Vezi Detalii
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
