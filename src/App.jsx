import React, { useState, useEffect } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PartnersCarousel } from './components/PartnersCarousel';
import { MissionVision } from './components/MissionVision';
import { HumanOperations } from './components/HumanOperations';
import { Services } from './components/Services';
import { ViscosityCalculator } from './components/ViscosityCalculator';
import { VenezuelaMap } from './components/VenezuelaMap';
import { HSECommitment } from './components/HSECommitment';
import { InstagramGallery } from './components/InstagramGallery';
import { ContactForm } from './components/ContactForm';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';

// Secret paths for high security
const isSecretAdminRoute = () => {
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const search = window.location.search.toLowerCase();
  return (
    hash === '#cysos-panel' || 
    hash === '#portal-interno' || 
    hash === '#admin' ||
    path.includes('/cysos-panel') ||
    path.includes('/portal-interno') ||
    path.includes('/admin') ||
    search.includes('cysos-panel') ||
    search.includes('admin=true')
  );
};

function MainAppContent() {
  const { isAdminOpen, setIsAdminOpen } = useCms();
  const [currentRoute, setCurrentRoute] = useState(() => {
    return isSecretAdminRoute() ? 'admin' : 'home';
  });

  useEffect(() => {
    const handleUrlCheck = () => {
      if (isSecretAdminRoute()) {
        setCurrentRoute('admin');
        setIsAdminOpen(true);
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('hashchange', handleUrlCheck);
    window.addEventListener('popstate', handleUrlCheck);
    return () => {
      window.removeEventListener('hashchange', handleUrlCheck);
      window.removeEventListener('popstate', handleUrlCheck);
    };
  }, [setIsAdminOpen]);

  // When isAdminOpen changes to true via shortcut, switch to admin route
  useEffect(() => {
    if (isAdminOpen) {
      setCurrentRoute('admin');
    }
  }, [isAdminOpen]);

  const handleReturnToWeb = () => {
    if (window.location.pathname.includes('/admin') || window.location.pathname.includes('/cysos-panel')) {
      window.history.pushState({}, '', '/');
    }
    window.location.hash = '';
    setCurrentRoute('home');
    setIsAdminOpen(false);
  };

  if (currentRoute === 'admin') {
    return <AdminDashboardPage onReturnToWeb={handleReturnToWeb} />;
  }

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 font-sans selection:bg-flame-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <PartnersCarousel />
        <MissionVision />
        <HumanOperations />
        <Services />
        <ViscosityCalculator />
        <VenezuelaMap />
        <HSECommitment />
        <InstagramGallery />
        <ContactForm />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export function App() {
  return (
    <CmsProvider>
      <MainAppContent />
    </CmsProvider>
  );
}

export default App;
