import React from 'react';
import { useCms } from '../context/CmsContext';

export const Logo = ({ className = "h-12 sm:h-14", showText = true, isDark = true, imageClassName = "h-12 sm:h-14 max-h-16" }) => {
  let companyInfo = {};
  try {
    const cms = useCms();
    if (cms && cms.companyInfo) {
      companyInfo = cms.companyInfo;
    }
  } catch {
    // If rendered outside CmsProvider fallback smoothly
  }

  // If user uploaded a custom logo image file in the CMS
  if (companyInfo && companyInfo.logoUrl) {
    return (
      <div className={`flex items-center gap-3 select-none cursor-pointer group ${className}`}>
        <img
          src={companyInfo.logoUrl}
          alt="CYSOS ENERGY"
          className={`${imageClassName} w-auto object-contain max-w-[320px] filter drop-shadow-[0_4px_16px_rgba(249,115,22,0.35)] transition-transform duration-300 group-hover:scale-105`}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none cursor-pointer group ${className}`}>
      {/* SVG Icon matching CYSOS ENERGY Teardrop & Flame Logo with High-Contrast Chrome Sheen */}
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0">
        <svg
          viewBox="0 0 120 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_4px_16px_rgba(249,115,22,0.4)]"
        >
          <defs>
            {/* Luminous Chrome / Platinum Droplet Gradient (High Contrast on Dark Backgrounds) */}
            <linearGradient id="cysos-droplet-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#E2E8F0" />
              <stop offset="55%" stopColor="#94A3B8" />
              <stop offset="85%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Bright Silver Glow Reflection */}
            <linearGradient id="cysos-silver-glow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="50%" stopColor="#F1F5F9" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.6" />
            </linearGradient>

            {/* Radiant Flame Layers */}
            <linearGradient id="flame-outer" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF7A00" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>

            <linearGradient id="flame-mid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF9900" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>

            <linearGradient id="flame-core" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE500" />
              <stop offset="100%" stopColor="#FACC15" />
            </linearGradient>

            {/* Drop Shadow Filter for Sharp Silhouette */}
            <filter id="droplet-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#FFFFFF" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* High-Contrast Platinum-Chrome Droplet Base */}
          <path
            d="M 58 10 C 30 45 10 75 10 98 C 10 120 28 135 55 135 C 40 130 25 115 25 95 C 25 75 42 50 60 20 Z"
            fill="url(#cysos-droplet-metallic)"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinejoin="round"
            filter="url(#droplet-glow)"
          />

          {/* Brilliant 3D Chrome Highlight Stripe */}
          <path
            d="M 59 18 C 42 45 27 72 27 92 C 27 110 38 123 52 130 C 42 122 34 108 34 93 C 34 76 47 52 61 24 Z"
            fill="url(#cysos-silver-glow)"
            opacity="0.95"
          />

          {/* Core White Light Glint on Droplet Apex */}
          <circle cx="34" cy="88" r="3.5" fill="#FFFFFF" opacity="0.8" />
          <path d="M 50 28 C 42 42 32 60 30 75" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

          {/* Outer Flame */}
          <path
            d="M 60 25 C 85 55 110 78 110 100 C 110 122 92 135 65 135 C 85 130 96 115 96 97 C 96 78 78 52 60 25 Z"
            fill="url(#flame-outer)"
            stroke="#F97316"
            strokeWidth="1"
          />

          {/* Middle Flame */}
          <path
            d="M 60 38 C 78 62 95 82 95 102 C 95 120 80 132 60 135 C 75 128 83 115 83 100 C 83 83 69 60 60 38 Z"
            fill="url(#flame-mid)"
          />

          {/* Core Flame */}
          <path
            d="M 60 52 C 72 70 82 86 82 103 C 82 118 72 130 58 134 C 68 126 73 115 73 102 C 73 88 63 68 60 52 Z"
            fill="url(#flame-core)"
          />
        </svg>
      </div>

      {/* Corporate Typography */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-heading font-black tracking-wider text-xl sm:text-2xl ${isDark ? 'text-white' : 'text-slate-900'} group-hover:text-gold-metallic transition-colors duration-200`}>
            CYSOS
          </span>
          <span className="font-heading font-extrabold text-[11px] sm:text-xs tracking-[0.22em] text-flame-500">
            ENERGY, C.A.
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
