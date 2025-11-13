"use client";

interface LogoProps {
  className?: string;
  size?: number;
  variant?: "default" | "icon" | "full";
}

export function Logo({ className = "", size = 120, variant = "default" }: LogoProps) {
  if (variant === "icon") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Background Circle */}
        <circle cx="60" cy="60" r="58" fill="#000000" stroke="#00FF00" strokeWidth="2"/>
        
        {/* Letter E with chart integration */}
        <path
          d="M 30 35 L 55 35 L 55 40 L 35 40 L 35 55 L 52 55 L 52 60 L 35 60 L 35 80 L 55 80 L 55 85 L 30 85 Z"
          fill="#00FF00"
        />
        
        {/* Letter T with arrow */}
        <path
          d="M 60 35 L 90 35 L 90 40 L 77 40 L 77 75 L 72 75 L 72 40 L 60 40 Z"
          fill="#00FF00"
        />
        
        {/* Chart Arrow going up through T */}
        <path
          d="M 74.5 75 L 74.5 45 L 70 50 M 74.5 45 L 79 50"
          stroke="#FF0000"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Small chart bars at bottom */}
        <rect x="32" y="75" width="3" height="8" fill="#00FF00" opacity="0.6"/>
        <rect x="37" y="70" width="3" height="13" fill="#00FF00" opacity="0.6"/>
        <rect x="42" y="72" width="3" height="11" fill="#00FF00" opacity="0.6"/>
        <rect x="47" y="68" width="3" height="15" fill="#00FF00" opacity="0.6"/>
      </svg>
    );
  }

  if (variant === "full") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <svg
          width={size * 0.5}
          height={size * 0.5}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="60" cy="60" r="58" fill="#000000" stroke="#00FF00" strokeWidth="2"/>
          <path
            d="M 30 35 L 55 35 L 55 40 L 35 40 L 35 55 L 52 55 L 52 60 L 35 60 L 35 80 L 55 80 L 55 85 L 30 85 Z"
            fill="#00FF00"
          />
          <path
            d="M 60 35 L 90 35 L 90 40 L 77 40 L 77 75 L 72 75 L 72 40 L 60 40 Z"
            fill="#00FF00"
          />
          <path
            d="M 74.5 75 L 74.5 45 L 70 50 M 74.5 45 L 79 50"
            stroke="#FF0000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <rect x="32" y="75" width="3" height="8" fill="#00FF00" opacity="0.6"/>
          <rect x="37" y="70" width="3" height="13" fill="#00FF00" opacity="0.6"/>
          <rect x="42" y="72" width="3" height="11" fill="#00FF00" opacity="0.6"/>
          <rect x="47" y="68" width="3" height="15" fill="#00FF00" opacity="0.6"/>
        </svg>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-[#00FF00] tracking-tight">EasyTrader</span>
          <span className="text-xs text-gray-400 -mt-1">A IA que cria milionários</span>
        </div>
      </div>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle */}
      <circle cx="60" cy="60" r="58" fill="#000000" stroke="#00FF00" strokeWidth="2"/>
      
      {/* Letter E with modern style */}
      <path
        d="M 30 35 L 55 35 L 55 40 L 35 40 L 35 55 L 52 55 L 52 60 L 35 60 L 35 80 L 55 80 L 55 85 L 30 85 Z"
        fill="#00FF00"
      />
      
      {/* Letter T */}
      <path
        d="M 60 35 L 90 35 L 90 40 L 77 40 L 77 75 L 72 75 L 72 40 L 60 40 Z"
        fill="#00FF00"
      />
      
      {/* Chart Arrow going up through T (red for bullish) */}
      <path
        d="M 74.5 75 L 74.5 45 L 70 50 M 74.5 45 L 79 50"
        stroke="#FF0000"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Small chart bars at bottom for extra detail */}
      <rect x="32" y="75" width="3" height="8" fill="#00FF00" opacity="0.6"/>
      <rect x="37" y="70" width="3" height="13" fill="#00FF00" opacity="0.6"/>
      <rect x="42" y="72" width="3" height="11" fill="#00FF00" opacity="0.6"/>
      <rect x="47" y="68" width="3" height="15" fill="#00FF00" opacity="0.6"/>
    </svg>
  );
}
