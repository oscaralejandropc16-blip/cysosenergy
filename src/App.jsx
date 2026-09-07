import React, { useState, useEffect } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PartnersCarousel } from './components/PartnersCarousel';
import { MissionVision } from './components/MissionVision';
import { MultidisciplinaryAlliances } from './components/MultidisciplinaryAlliances';
import { HumanOperations } from './components/HumanOperations';
import { Services } from './components/Services';
import { ViscosityCalculator } from './components/ViscosityCalculator';
import { VenezuelaMap } from './components/VenezuelaMap';
import { HSECommitment } from './components/HSECommitment';
import { InstagramGallery } from './components/InstagramGallery';
import { NewsSection } from './components/NewsSection';
import { ContactForm } from './components/ContactForm';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';
import { TopOperationalTicker } from './components/TopOperationalTicker';
import { TrustBadgesStrip } from './components/TrustBadgesStrip';
import { RecentOperations } from './components/RecentOperations';
import { FloatingOperationsWidget } from './components/FloatingOperationsWidget';
import { DossierModal } from './components/DossierModal';

// Secret paths for high security
const isSecretAdminRoute = () => {
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const search = window.location.search.toLowerCase();
  return (
    hash === '#acceso-corporativo-cysos-2026' || 
    path.includes('/acceso-corporativo-cysos-2026') ||
    search.includes('acceso-corporativo-cysos-2026')
  );
};

function MainAppContent() {
  const { isAdminOpen, setIsAdminOpen } = useCms();
  const [currentRoute, setCurrentRoute] = useState(() => {
    return isSecretAdminRoute() ? 'admin' : 'home';
  });
  const [isDossierOpen, setIsDossierOpen] = useState(false);

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
    if (window.location.pathname.includes('/acceso-corporativo-cysos-2026')) {
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
    <>
      <TopOperationalTicker onOpenDossier={() => setIsDossierOpen(true)} />
      <Navbar onOpenDossier={() => setIsDossierOpen(true)} />
      <div className="min-h-screen bg-navy-950 text-slate-100 font-sans selection:bg-flame-500 selection:text-white">
        <main>
          <Hero onOpenDossier={() => setIsDossierOpen(true)} />
          <TrustBadgesStrip onOpenDossier={() => setIsDossierOpen(true)} />
          <PartnersCarousel />
          <MissionVision />
          <MultidisciplinaryAlliances />
          <HumanOperations />
          <Services />
          <RecentOperations onOpenDossier={() => setIsDossierOpen(true)} />
          <ViscosityCalculator />
          <VenezuelaMap />
          <HSECommitment />
          <InstagramGallery />
          <NewsSection />
          <ContactForm />
        </main>
        <Footer />
        <ScrollToTop />
        <FloatingOperationsWidget />
        <DossierModal isOpen={isDossierOpen} onClose={() => setIsDossierOpen(false)} />
      </div>
    </>
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
