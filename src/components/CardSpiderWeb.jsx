import React from 'react';
import { useHalloween } from '../context/HalloweenContext';

export const CardSpiderWeb = ({ position = 'top-right', size = 'w-16 h-16', opacity = 'opacity-30' }) => {
  const { isHalloween } = useHalloween();
  if (!isHalloween) return null;

  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0 scale-x-[-1]',
    'bottom-right': 'bottom-0 right-0 scale-y-[-1]',
    'bottom-left': 'bottom-0 left-0 scale-x-[-1] scale-y-[-1]'
  }[position] || 'top-0 right-0';

  return (
    <div className={`absolute ${positionClasses} ${size} ${opacity} pointer-events-none z-10 text-orange-400 group-hover:opacity-70 group-hover:text-orange-300 transition-all duration-300`}>
      <svg viewBox="0 0 60 60" className="w-full h-full fill-none stroke-current stroke-[1.2]">
        <path d="M0,0 L60,0 M0,0 L50,22 M0,0 L38,38 M0,0 L22,50 M0,0 L0,60" />
        <path d="M14,0 Q12,6 0,14 M28,0 Q24,12 0,28 M42,0 Q36,20 0,42 M56,0 Q48,28 0,56" />
        <circle cx="0" cy="0" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};
