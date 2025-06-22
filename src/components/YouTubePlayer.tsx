import { useEffect, useRef, useState } from 'react';

interface YouTubePlayerProps {
  url: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  focusPoint?: {
    x: number; // 0-1 (left to right)
    y: number; // 0-1 (top to bottom)
  };
  objectFit?: 'cover' | 'contain';
  objectPosition?: string;
  onError?: (error: string) => void;
}

export function YouTubePlayer({
  url,
  width = '100%',
  height = '100%',
  className = '',
  autoplay = false,
  controls = true,
  loop = false,
  muted = true,
  onError,
  ...props
}: YouTubePlayerProps) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!url) {
      setEmbedUrl(null);
      setError('Niciun URL specificat');
      onError?.('Niciun URL specificat');
      return;
    }

    try {
      // Basic URL validation
      if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        throw new Error('URL-ul trebuie să fie de la YouTube');
      }

      const getVideoId = (url: string): string | null => {
        try {
          // Handle youtu.be short URLs
          if (url.includes('youtu.be/')) {
            const id = url.split('youtu.be/')[1].split('?')[0];
            return id.length === 11 ? id : null;
          }
          
          // Handle standard YouTube URLs
          const urlObj = new URL(url);
          if (urlObj.hostname.includes('youtube.com')) {
            // Handle /shorts/ URLs
            if (urlObj.pathname.startsWith('/shorts/')) {
              return urlObj.pathname.split('/shorts/')[1].split('?')[0];
            }
            // Handle watch?v= URLs
            if (urlObj.pathname === '/watch' && urlObj.searchParams.has('v')) {
              return urlObj.searchParams.get('v');
            }
            // Handle embed URLs
            if (urlObj.pathname.startsWith('/embed/')) {
              return urlObj.pathname.split('/embed/')[1].split('?')[0];
            }
          }
          
          // Fallback regex for other cases
          const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
          const match = url.match(regExp);
          return match && match[2].length === 11 ? match[2] : null;
        } catch (e) {
          console.error('Eroare la parsarea URL-ului:', e);
          return null;
        }
      };

      const videoId = getVideoId(url);
      if (!videoId) {
        throw new Error('Nu s-a putut extrage ID-ul videoclipului din URL');
      }

      // Build the embed URL with parameters
      const params = new URLSearchParams();
      params.append('autoplay', autoplay ? '1' : '0');
      params.append('controls', controls ? '1' : '0');
      params.append('loop', loop ? '1' : '0');
      params.append('mute', muted ? '1' : '0');
      params.append('modestbranding', '1');
      params.append('rel', '0');
      params.append('showinfo', '0');
      params.append('iv_load_policy', '3'); // Hide annotations
      params.append('fs', '0'); // Hide fullscreen button
      
      if (loop) {
        params.append('playlist', videoId); // Required for loop to work
      }
      params.append('mute', muted ? '1' : '0');
      
      // Add origin to prevent showing related videos
      params.append('origin', window.location.origin);
      const embedUrl = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
      setEmbedUrl(embedUrl);
      setError(null);
      onError?.(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Eroare necunoscută la încărcarea videoclipului';
      console.error('Eroare YouTubePlayer:', errorMessage);
      setError(errorMessage);
      onError?.(errorMessage);
      setEmbedUrl(null);
    }
  }, [url, autoplay, controls, loop, muted, onError]);

  if (error) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center text-red-500 p-4 rounded ${className}`}>
        <div className="text-center">
          <p className="font-medium">Eroare la încărcarea videoclipului</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!embedUrl) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`} style={{ width, height }}>
        <div className="text-gray-500">Loading video...</div>
      </div>
    );
  }

  const containerStyle = {
    width,
    height,
    position: 'relative',
    overflow: 'hidden',
  } as React.CSSProperties;

  const iframeStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: props.objectFit || 'cover',
    objectPosition: props.focusPoint 
      ? `${props.focusPoint.x * 100}% ${props.focusPoint.y * 100}%` 
      : props.objectPosition || 'center',
  };

  return (
    <div 
      className={`overflow-hidden ${className}`} 
      style={{
        ...containerStyle,
        position: 'relative',
        backgroundColor: '#000',
      }}
    >
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        paddingTop: '56.25%' /* 16:9 Aspect Ratio */
      }}>
        <iframe
          ref={playerRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            ...iframeStyle
          }}
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default YouTubePlayer;
