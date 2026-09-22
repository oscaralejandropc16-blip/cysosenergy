import React, { useState, useEffect } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PartnersCarousel } from './components/PartnersCarousel';
import { MissionVision } from './components/MissionVision';
import { Services } from './components/Services';
import { ViscosityCalculator } from './components/ViscosityCalculator';
import { VenezuelaMap } from './components/VenezuelaMap';
import { HSECommitment } from './components/HSECommitment';
import { NewsSection } from './components/NewsSection';
import { ContactForm } from './components/ContactForm';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { PressRoomPage } from './components/PressRoomPage';
import { ArticleDetailPage } from './components/ArticleDetailPage';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';
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

const isPressRoomRoute = () => {
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  return (
    hash === '#sala-de-prensa-completa' || 
    path.includes('/sala-de-prensa')
  );
};

const getArticleIdFromUrl = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#noticia/')) {
    return hash.replace('#noticia/', '');
  }
  if (hash.startsWith('#articulo/')) {
    return hash.replace('#articulo/', '');
  }
  return null;
};

function MainAppContent() {
  const { isAdminOpen, setIsAdminOpen } = useCms();
  const [currentArticleId, setCurrentArticleId] = useState(() => getArticleIdFromUrl());
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (isSecretAdminRoute()) return 'admin';
    const artId = getArticleIdFromUrl();
    if (artId) return 'articulo';
    if (isPressRoomRoute()) return 'sala-de-prensa';
    return 'home';
  });
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  useEffect(() => {
    const handleUrlCheck = () => {
      const artId = getArticleIdFromUrl();
      if (isSecretAdminRoute()) {
        setCurrentRoute('admin');
        setIsAdminOpen(true);
      } else if (artId) {
        setCurrentArticleId(artId);
        setCurrentRoute('articulo');
      } else if (isPressRoomRoute()) {
        setCurrentRoute('sala-de-prensa');
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

  const handleOpenArticle = (id) => {
    window.location.hash = `#noticia/${id}`;
    setCurrentArticleId(id);
    setCurrentRoute('articulo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPressRoom = () => {
    window.location.hash = '#sala-de-prensa-completa';
    setCurrentRoute('sala-de-prensa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnFromPressRoom = () => {
    window.location.hash = '#sala-de-prensa';
    setCurrentRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnToHome = () => {
    window.location.hash = '';
    setCurrentRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentRoute === 'admin') {
    return <AdminDashboardPage onReturnToWeb={handleReturnToWeb} />;
  }

  if (currentRoute === 'articulo') {
    return (
      <>
        <ArticleDetailPage
          articleId={currentArticleId}
          onReturnToPressRoom={handleOpenPressRoom}
          onReturnToHome={handleReturnToHome}
          onOpenArticle={handleOpenArticle}
          onOpenDossier={() => setIsDossierOpen(true)}
        />
        <DossierModal isOpen={isDossierOpen} onClose={() => setIsDossierOpen(false)} />
        <ScrollToTop />
      </>
    );
  }

  if (currentRoute === 'sala-de-prensa') {
    return (
      <>
        <PressRoomPage 
          onReturnToHome={handleReturnFromPressRoom} 
          onOpenArticle={handleOpenArticle}
          onOpenDossier={() => setIsDossierOpen(true)} 
        />
        <DossierModal isOpen={isDossierOpen} onClose={() => setIsDossierOpen(false)} />
        <ScrollToTop />
      </>
    );
  }

  return (
    <>
      <header className="absolute top-0 left-0 right-0 w-full z-50 pointer-events-none">
        <Navbar onOpenDossier={() => setIsDossierOpen(true)} />
      </header>
      <div className="min-h-screen bg-navy-950 text-slate-100 font-sans selection:bg-flame-500 selection:text-white">
        <main>
          <Hero onOpenDossier={() => setIsDossierOpen(true)} />
          <PartnersCarousel />
          <MissionVision />
          <Services />
          <ViscosityCalculator />
          <VenezuelaMap />
          <HSECommitment />
          <NewsSection 
            onOpenFullPressRoom={handleOpenPressRoom}
            onOpenArticle={handleOpenArticle}
          />
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
