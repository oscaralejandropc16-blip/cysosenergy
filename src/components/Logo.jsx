import React from 'react';
import { useCms } from '../context/CmsContext';

export const Logo = ({ className = "h-12 sm:h-14", showText = true, isDark = true, imageClassName = "h-12 sm:h-14 max-h-16" }) => {
  const cms = useCms();
  const companyInfo = cms?.companyInfo || {};
  const logoSrc = companyInfo?.logoUrl || '/images/cysos_logo.png';

  if (!showText) {
    // In avatar or icon-only context (like Instagram profile avatar)
    return (
      <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-full">
        <img
          src={logoSrc}
          alt="CYSOS ENERGY"
          className="w-full h-full object-contain p-1 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none cursor-pointer group ${className}`}>
      <img
        src={logoSrc}
        alt="CYSOS ENERGY"
        className={`${imageClassName} w-auto object-contain max-w-[320px] filter drop-shadow-[0_4px_16px_rgba(249,115,22,0.35)] transition-transform duration-300 group-hover:scale-105`}
      />
    </div>
  );
};

export default Logo;
