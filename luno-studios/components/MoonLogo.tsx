import React from 'react';

interface MoonLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export const MoonLogo: React.FC<MoonLogoProps> = ({ className = "", size = 40, animated = true }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Outer glow ring */}
      <div className={`absolute inset-0 rounded-full bg-luno-accent opacity-20 blur-xl ${animated ? 'animate-pulse' : ''}`} />
      
      {/* Moon SVG */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`text-luno-accent z-10 ${animated ? 'animate-float' : ''}`}
        style={{ 
          width: '100%', 
          height: '100%',
          filter: 'drop-shadow(0 0 8px rgba(255, 212, 59, 0.5))' 
        }}
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" fillOpacity="0.2" />
      </svg>
      
      {/* Small orbiting star/satellite */}
      <div 
        className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{
          top: '10%',
          right: '10%',
          animation: animated ? 'twinkle 3s infinite alternate' : 'none'
        }}
      />
    </div>
  );
};