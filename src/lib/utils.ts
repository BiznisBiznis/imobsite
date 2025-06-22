import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;

  let videoId: string | null = null;
  const isShorts = url.includes('/shorts/');

  // Handle YouTube Shorts URL with query parameters: https://youtube.com/shorts/VIDEO_ID?si=PARAM
  const shortsMatch = url.match(/(?:youtube\.com\/shorts\/|youtu\.be\/|\/embed\/|\/v\/|\/watch\?v=)([^?&\/]+)/i);
  if (shortsMatch && shortsMatch[1]) {
    videoId = shortsMatch[1];
  }
  // Fallback for other URL formats
  else if (url.includes('youtube.com/watch')) {
    const standardMatch = url.match(/[?&]v=([^&]+)/i);
    if (standardMatch) {
      videoId = standardMatch[1];
    }
  }

  if (videoId) {
    // Clean up any query parameters from the video ID
    const cleanVideoId = videoId.split(/[?&]/)[0];
    
    // For Shorts, use the standard embed format with additional parameters
    if (isShorts) {
      return `https://www.youtube.com/embed/${cleanVideoId}?autoplay=0&mute=1&controls=1&showinfo=0&rel=0`;
    }
    // For regular videos
    return `https://www.youtube.com/embed/${cleanVideoId}?autoplay=1&mute=1&loop=1&playlist=${cleanVideoId}&controls=1&showinfo=0&rel=0`;
  }

  return null;
}
