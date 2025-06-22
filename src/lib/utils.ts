import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;

  let videoId: string | null = null;

  // Standard URL: https://www.youtube.com/watch?v=VIDEO_ID
  const standardUrlMatch = url.match(/[?&]v=([^&]+)/);
  if (standardUrlMatch) {
    videoId = standardUrlMatch[1];
  }

  // Shorts URL: https://www.youtube.com/shorts/VIDEO_ID
  if (!videoId) {
    const shortsUrlMatch = url.match(/\/shorts\/([^?]+)/);
    if (shortsUrlMatch) {
      videoId = shortsUrlMatch[1];
    }
  }

  // Shortened URL: https://youtu.be/VIDEO_ID
  if (!videoId) {
    const shortenedUrlMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortenedUrlMatch) {
      videoId = shortenedUrlMatch[1];
    }
  }

  if (videoId) {
    // Return a clean embed URL with hidden title and channel name
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0`;
  }

  return null; // Return null if no valid YouTube video ID is found
}
