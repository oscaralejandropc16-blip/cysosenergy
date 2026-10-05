import React, { useState, useEffect, useMemo } from 'react';
import { useHalloween } from '../context/HalloweenContext';

export const HalloweenAtmosphere = () => {
  const { isHalloween } = useHalloween();
  const [clickParticles, setClickParticles] = useState([]);

  // Spawn click particles (tiny embers/bats)
  useEffect(() => {
    if (!isHalloween) return;

    const handleClick = (e) => {
      // Don't spawn if clicking interactive inputs or buttons to avoid distraction
      const target = e.target;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      const id = Date.now() + Math.random();
      const newParticle = {
        id,
        x: e.clientX,
        y: e.clientY,
        icon: Math.random() > 0.5 ? '🎃' : '🦇'
      };

      setClickParticles((prev) => [...prev.slice(-6), newParticle]);

      setTimeout(() => {
        setClickParticles((prev) => prev.filter((p) => p.id !== id));
      }, 1200);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isHalloween]);

  // Pre-calculated bat trajectories
  const bats = useMemo(() => [
    { id: 1, top: '15%', delay: '0s', duration: '18s', size: 28, startLeft: -50 },
    { id: 2, top: '28%', delay: '6s', duration: '22s', size: 22, startLeft: -60 },
    { id: 3, top: '45%', delay: '12s', duration: '20s', size: 32, startLeft: -40 },
    { id: 4, top: '70%', delay: '3s', duration: '25s', size: 24, startLeft: -50 }
  ], []);

  // Pre-calculated floating embers
  const embers = useMemo(() => Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    left: `${(i * 7.5 + Math.random() * 4) % 100}%`,
    bottom: `${-20 + Math.random() * 30}px`,
    duration: `${6 + (i % 5) * 2}s`,
    delay: `${(i * 0.8) % 6}s`,
    size: 4 + (i % 4) * 2,
    color: i % 3 === 0 ? '#ff7700' : i % 3 === 1 ? '#a855f7' : '#ff9900'
  })), []);

  if (!isHalloween) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[45] overflow-hidden select-none">
      {/* 1. TOP CORNER SPIDERWEBS WITH ANIMATED SWAYING SPIDERS */}
      <div className="absolute top-0 left-0 w-36 h-36 sm:w-48 sm:h-48 text-orange-500/25 transition-opacity duration-700">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[1.2]">
          <path d="M0,0 L100,0 M0,0 L85,35 M0,0 L65,65 M0,0 L35,85 M0,0 L0,100" />
          <path d="M20,0 Q18,8 0,20 M40,0 Q36,18 0,40 M60,0 Q54,28 0,60 M80,0 Q72,40 0,80 M100,0 Q90,52 0,100" />
          <path d="M25,0 C22,12 12,22 0,25 M50,0 C45,25 25,45 0,50 M75,0 C68,38 38,68 0,75" strokeWidth="0.8" opacity="0.6" />
        </svg>
        {/* Hanging spider */}
        <div className="absolute top-[68px] left-[68px] animate-spider-swing origin-top">
          <div className="w-[1px] h-8 bg-orange-400/40 mx-auto" />
          <div className="w-3.5 h-3.5 bg-orange-500/80 rounded-full relative shadow-[0_0_8px_#ff6600]">
            <span className="text-[10px] absolute -top-1.5 -left-1">🕷️</span>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-36 h-36 sm:w-48 sm:h-48 text-purple-500/25 scale-x-[-1] transition-opacity duration-700">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[1.2]">
          <path d="M0,0 L100,0 M0,0 L85,35 M0,0 L65,65 M0,0 L35,85 M0,0 L0,100" />
          <path d="M20,0 Q18,8 0,20 M40,0 Q36,18 0,40 M60,0 Q54,28 0,60 M80,0 Q72,40 0,80 M100,0 Q90,52 0,100" />
        </svg>
      </div>

      {/* 2. FLYING BATS ACROSS SCREEN */}
      {bats.map((bat) => (
        <div
          key={bat.id}
          className="absolute animate-bat-fly"
          style={{
            top: bat.top,
            animationDuration: bat.duration,
            animationDelay: bat.delay
          }}
        >
          <div className="animate-bat-wing-flap">
            <svg
              width={bat.size}
              height={bat.size * 0.55}
              viewBox="0 0 100 55"
              fill="rgba(255, 120, 0, 0.45)"
              className="drop-shadow-[0_0_6px_rgba(255,107,0,0.6)]"
            >
              <path d="M50 35 C40 10, 15 5, 0 15 C10 35, 30 45, 45 42 C40 48, 30 52, 25 55 C35 55, 48 48, 50 43 C52 48, 65 55, 75 55 C70 52, 60 48, 55 42 C70 45, 90 35, 100 15 C85 5, 60 10, 50 35 Z" />
            </svg>
          </div>
        </div>
      ))}

      {/* 3. ASCENDING SPECTRAL EMBERS / PARTICLES */}
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="absolute rounded-full animate-ember-float"
          style={{
            left: ember.left,
            bottom: ember.bottom,
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            backgroundColor: ember.color,
            boxShadow: `0 0 10px ${ember.color}, 0 0 20px ${ember.color}`,
            animationDuration: ember.duration,
            animationDelay: ember.delay,
            opacity: 0.6
          }}
        />
      ))}

      {/* 4. CLICK RIPPLE BURST PARTICLES */}
      {clickParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-particle-pop text-lg pointer-events-none drop-shadow-[0_0_12px_rgba(255,107,0,0.9)]"
          style={{
            left: particle.x - 12,
            top: particle.y - 12
          }}
        >
          {particle.icon}
        </div>
      ))}

      {/* 5. EERIE MIST / FOG LAYER AT VIEWPORT BOTTOM */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-orange-950/20 via-purple-950/10 to-transparent pointer-events-none mix-blend-screen overflow-hidden">
        <div className="absolute inset-0 bg-repeat-x opacity-40 animate-fog-drift" style={{
          backgroundImage: 'radial-gradient(ellipse at 50% 100%, rgba(255, 107, 0, 0.25) 0%, rgba(147, 51, 234, 0.15) 45%, transparent 75%)',
          backgroundSize: '800px 100%'
        }} />
      </div>
    </div>
  );
};
