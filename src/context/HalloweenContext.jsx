import React, { createContext, useContext, useState, useEffect } from 'react';

const HalloweenContext = createContext();

export const HalloweenProvider = ({ children }) => {
  const [isHalloween, setIsHalloween] = useState(() => {
    try {
      const saved = localStorage.getItem('cysos_halloween_mode');
      return saved !== null ? saved === 'true' : true; // Por defecto activo para la temporada
    } catch {
      return true;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState(false);

  // Play a gentle spooky synth sound on toggle using Web Audio API
  const playSpookySound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.35);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.7);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      // Audio might be blocked by browser autoplay policy
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('cysos_halloween_mode', isHalloween.toString());
    } catch {}

    if (isHalloween) {
      document.documentElement.classList.add('halloween-theme');
      document.body.classList.add('halloween-theme');
    } else {
      document.documentElement.classList.remove('halloween-theme');
      document.body.classList.remove('halloween-theme');
    }
  }, [isHalloween]);

  const toggleHalloween = () => {
    setIsHalloween((prev) => {
      const next = !prev;
      if (next) playSpookySound();
      return next;
    });
  };

  return (
    <HalloweenContext.Provider
      value={{
        isHalloween,
        toggleHalloween,
        soundEnabled,
        setSoundEnabled
      }}
    >
      {children}
    </HalloweenContext.Provider>
  );
};

export const useHalloween = () => {
  const context = useContext(HalloweenContext);
  if (!context) {
    return {
      isHalloween: true,
      toggleHalloween: () => {},
      soundEnabled: false
    };
  }
  return context;
};
