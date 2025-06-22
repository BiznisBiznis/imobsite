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
    <div
      className="bg-white border-2 border-red-600 rounded-xl shadow-xl property-card-hover luxury-shadow group overflow-hidden w-full h-[500px] flex flex-col property-card cursor-pointer"
      onClick={onClick}
    >
      {/* Video Player - Top Section */}
      <div className="relative rounded-t-xl overflow-hidden">
        <VideoPlayer
          videoUrl={videoUrl}
          thumbnailUrl={thumbnailUrl}
          className="w-full h-[380px]"
          aspectRatio="mobile"
          onClick={(e) => {
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

      {/* Property Information - Improved Typography */}
      <div className="px-4 pt-3 pb-3 text-slate-900 flex flex-col h-[120px] justify-between text-center">
        {/* Price - Large at top with elegant metallic font */}
        <div className="text-lg font-bold text-slate-900 mb-1 tracking-tight">
          {currency}
          {price.toLocaleString()}
        </div>

        {/* Title/Description - Better font and spacing */}
        <h3
          className="text-sm text-slate-700 overflow-hidden flex-shrink-0 leading-relaxed mb-2 tracking-wide"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            maxHeight: "2.5rem",
            fontWeight: "500",
          }}
        >
          {title}
        </h3>

        {/* Premium Details Button - Expensive Design */}
        <div className="flex justify-center">
          <button
            className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 tracking-wide uppercase border border-red-500/20 min-w-[100px]"
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
