import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  className?: string;
  aspectRatio?: "mobile" | "standard";
  autoplay?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const VideoPlayer = ({
  videoUrl,
  thumbnailUrl,
  className = "",
  aspectRatio = "mobile",
  autoplay = false,
  onClick,
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isYoutube, setIsYoutube] = useState(false);
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoUrl) {
      const youtubeRegex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts\/)([^#&?]*).*/;
      const match = videoUrl.match(youtubeRegex);
      
      if (match && match[3]) {
        setIsYoutube(true);
        setYoutubeEmbedUrl(`https://www.youtube.com/embed/${match[3]}`);
      } else {
        setIsYoutube(false);
      }
    }
  }, [videoUrl]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Previne propagarea către alte click handlers
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        // Autoplay când se dă click
        videoRef.current.play().catch((error) => {
          console.log("Autoplay prevented by browser:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const aspectRatioClass =
    aspectRatio === "mobile" ? "aspect-[9/16]" : "aspect-video";

  if (isYoutube) {
    return (
      <div className={`relative bg-black rounded-lg overflow-hidden group ${aspectRatioClass} ${className}`}>
        <iframe
          src={`${youtubeEmbedUrl}?autoplay=0&mute=1&controls=1&showinfo=0&rel=0`}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative bg-black rounded-lg overflow-hidden group ${aspectRatioClass} ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        if (onClick) {
          onClick(e);
        } else {
          togglePlay(e);
        }
      }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={thumbnailUrl}
        muted={isMuted}
        loop
        playsInline
        autoPlay={autoplay}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Controls Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${showControls || !isPlaying ? "opacity-100" : "opacity-0"}`}
      >
        <button
          onClick={(e) => togglePlay(e)}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-1" />
          )}
        </button>
      </div>

      {/* Bottom Controls */}
      <div
        className={`absolute bottom-2 right-2 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        <button
          onClick={toggleMute}
          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Video Duration/Progress Indicator */}
      <div className="absolute bottom-2 left-2">
        <div className="bg-black/50 text-white text-xs px-2 py-1 rounded">
          1:24
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
