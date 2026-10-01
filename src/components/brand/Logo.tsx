import React from "react";

interface LogoProps {
  variant?: "dark" | "light" | "color-on-white";
  size?: "sm" | "md" | "lg";
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "color-on-white",
  size = "md",
  className = "",
  showTagline = true,
}) => {
  // Dimensions
  const dimensions = {
    sm: { icon: 34, text: "text-lg", sub: "text-[10px]" },
    md: { icon: 42, text: "text-xl", sub: "text-[11px]" },
    lg: { icon: 52, text: "text-2xl", sub: "text-xs" },
  }[size];

  const isLight = variant === "light";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon SVG */}
      <svg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform hover:scale-105 duration-200"
        aria-label="Up 2 Sky Travels Logo"
      >
        {/* Sky Blue Orbit Swoosh */}
        <path
          d="M14 62 C22 30, 52 14, 88 18 C70 34, 52 48, 38 72 C32 82, 22 78, 14 62 Z"
          fill="#21A6DC"
        />
        {/* Deep Royal Blue Lower Swoosh Arc */}
        <path
          d="M8 72 C22 84, 56 86, 82 58 C68 64, 46 68, 28 54 C20 48, 12 58, 8 72 Z"
          fill="#2077B1"
        />
        {/* Primary Yellow / Gold Dynamic Wing Arc */}
        <path
          d="M24 48 C42 28, 68 20, 92 14 C82 26, 72 38, 58 52 C44 64, 32 58, 24 48 Z"
          fill="#FBC615"
        />
        {/* Stylized Modern Jet Silhouette in White / Contrast */}
        <path
          d="M50 18 L68 12 L64 28 L78 34 L76 38 L62 33 L48 54 L42 53 L50 31 L36 30 L30 36 L26 35 L30 26 L26 17 L30 16 L36 22 L50 21 Z"
          fill="#FFFFFF"
          className="drop-shadow-sm"
        />
        {/* Golden Sun / Horizon Accent Accent Sparkle */}
        <circle cx="86" cy="16" r="4.5" fill="#FBC615" />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <div
          className={`font-black tracking-tight font-display flex items-baseline ${dimensions.text} ${
            isLight ? "text-white" : "text-[#2077B1]"
          }`}
        >
          <span>UP</span>
          <span className="mx-1 text-[#FBC615] font-extrabold italic">2</span>
          <span className={isLight ? "text-white" : "text-[#21A6DC]"}>SKY</span>
        </div>
        {showTagline && (
          <div
            className={`font-semibold tracking-[0.25em] uppercase mt-0.5 ${dimensions.sub} ${
              isLight ? "text-sky-200" : "text-[#3E3E3E]"
            }`}
          >
            TRAVELS
          </div>
        )}
      </div>
    </div>
  );
};
