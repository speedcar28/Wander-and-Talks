import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Headphones, Volume2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { isDark, toggleDark } = useTheme();
  const { isPlaying, currentEpisode, togglePlay } = useAudio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: 'home' },
    { label: 'Blog', path: 'blog' },
    { label: 'Destinations', path: 'destinations' },
    { label: 'Podcast', path: 'podcast' },
    { label: 'About', path: 'about' },
    { label: 'Contact', path: 'contact' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#EAE3D2] dark:border-[#223347] bg-[#FBF8F2]/90 dark:bg-[#0D1520]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element Brand Zone */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group flex items-baseline gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E06D3B] rounded-sm"
          aria-label="Wander & Talk Home"
        >
          <span className="font-serif text-2xl font-bold tracking-tight text-[#0F1B2B] dark:text-[#FBF8F2] group-hover:text-[#E06D3B] transition-colors">
            Wander &amp; Talk
          </span>
        </button>

        {/* Zone 2: 4-6 Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || 
              (link.path === 'blog' && currentPath.startsWith('blog-article')) ||
              (link.path === 'destinations' && currentPath.startsWith('destination-'));
            
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E06D3B] rounded-sm ${
                  isActive
                    ? 'text-[#0F1B2B] dark:text-white font-semibold'
                    : 'text-[#4A5E78] dark:text-[#94A9C4] hover:text-[#0F1B2B] dark:hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E06D3B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Dark mode toggle + Podcast quick trigger) */}
        <div className="flex items-center gap-3">
          {/* Quick Podcast trigger */}
          <button
            onClick={() => {
              if (currentPath !== 'podcast') {
                handleNavClick('podcast');
              } else {
                togglePlay();
              }
            }}
            className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md border transition-all ${
              isPlaying
                ? 'bg-[#E06D3B] text-white border-[#E06D3B] shadow-sm animate-pulse'
                : 'bg-[#F4EFE6] dark:bg-[#18283E] text-[#0F1B2B] dark:text-[#E6EDF5] border-[#EAE3D2] dark:border-[#243954] hover:border-[#E06D3B]'
            }`}
            title={isPlaying ? `Playing: ${currentEpisode?.title}` : "Listen to Podcast"}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                <span className="truncate max-w-[120px]">Ep. 0{currentEpisode?.episodeNumber} Playing</span>
              </>
            ) : (
              <>
                <Headphones className="w-3.5 h-3.5 text-[#E06D3B]" />
                <span>Listen Now</span>
              </>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDark}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 text-[#4A5E78] dark:text-[#94A9C4] hover:text-[#0F1B2B] dark:hover:text-white bg-[#F4EFE6] dark:bg-[#18283E] border border-[#EAE3D2] dark:border-[#243954] rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E06D3B]"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#0F1B2B]" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-[#0F1B2B] dark:text-white bg-[#F4EFE6] dark:bg-[#18283E] border border-[#EAE3D2] dark:border-[#243954] rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E06D3B]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#EAE3D2] dark:border-[#223347] bg-[#FBF8F2] dark:bg-[#0D1520] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#EAE3D2] dark:bg-[#18283E] text-[#0F1B2B] dark:text-white font-semibold'
                    : 'text-[#4A5E78] dark:text-[#94A9C4] hover:bg-[#F4EFE6] dark:hover:bg-[#142030]'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => handleNavClick('podcast')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-md bg-[#0F1B2B] dark:bg-[#E06D3B] text-white hover:bg-[#1C2D42] dark:hover:bg-[#C75525] transition-colors"
            >
              <Headphones className="w-4 h-4" />
              <span>Explore All Podcast Episodes</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
