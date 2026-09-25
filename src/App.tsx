import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickyMiniPlayer } from './components/StickyMiniPlayer';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { BlogArticlePage } from './pages/BlogArticlePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { PodcastPage } from './pages/PodcastPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ProfilePage } from './pages/ProfilePage';

export function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    // Read from window hash if available
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    return hash || 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash) {
        setCurrentPath(hash);
      } else {
        setCurrentPath('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.location.hash = `#/${path}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    if (currentPath.startsWith('blog-article-')) {
      const slug = currentPath.replace('blog-article-', '');
      return <BlogArticlePage slug={slug} onNavigate={navigateTo} />;
    }

    if (currentPath.startsWith('destination-')) {
      const slug = currentPath.replace('destination-', '');
      return <DestinationDetailPage slug={slug} onNavigate={navigateTo} />;
    }

    switch (currentPath) {
      case 'blog':
        return <BlogPage onNavigate={navigateTo} />;
      case 'destinations':
        return <DestinationsPage onNavigate={navigateTo} />;
      case 'podcast':
        return <PodcastPage onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      case 'profile':
        return <ProfilePage onNavigate={navigateTo} />;
      case 'home':
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F2] dark:bg-[#0D1520] text-[#0F1B2B] dark:text-[#E6EDF5] transition-colors duration-200 selection:bg-[#E06D3B]/20 selection:text-[#E06D3B]">
      {/* Top Bar Header */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Persistent Sticky Mini Player Dock */}
      <StickyMiniPlayer onOpenPodcastPage={() => navigateTo('podcast')} />

      {/* Global Auth / Profile Modal */}
      <AuthModal onNavigateToProfile={() => navigateTo('profile')} />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AudioProvider>
          <AppContent />
          <Analytics />
          <SpeedInsights />
        </AudioProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
