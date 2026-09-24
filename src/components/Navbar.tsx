import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Headphones, Volume2, User, Bookmark } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { isDark, toggleDark } = useTheme();
  const { isPlaying, currentEpisode, togglePlay } = useAudio();
  const { user, isAuthenticated, openAuthModal, favorites } = useAuth();
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
          className="text-left group flex items-baseline gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E06D3B] rounded-sm cursor-pointer"
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
                className={`transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E06D3B] rounded-sm cursor-pointer ${
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

        {/* Zone 3: Actions (User Profile + Dark mode toggle + Podcast quick trigger) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* User Account / Profile Button */}
          {isAuthenticated && user ? (
            <button
              onClick={() => handleNavClick('profile')}
              title={`Logged in as ${user.name} - View saved profile`}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                currentPath === 'profile'
                  ? 'bg-[#E06D3B]/10 border-[#E06D3B] text-[#E06D3B]'
                  : 'bg-[#F4EFE6] dark:bg-[#18283E] border-[#EAE3D2] dark:border-[#243954] text-[#0F1B2B] dark:text-white hover:border-[#E06D3B]'
              }`}
            >
              <img
                src={user.avatar || '/src/assets/images/creator_portrait_1790236082709.jpg'}
                alt={user.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="text-xs font-semibold hidden sm:inline max-w-[80px] truncate">
                {user.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              title="Sign In / Saved Library"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#F4EFE6] dark:bg-[#18283E] text-[#0F1B2B] dark:text-white border border-[#EAE3D2] dark:border-[#243954] hover:border-[#E06D3B] transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#E06D3B]" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Quick Podcast trigger */}
          <button
            onClick={() => {
              if (currentPath !== 'podcast') {
                handleNavClick('podcast');
              } else {
                togglePlay();
              }
            }}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#E06D3B] text-white border-[#E06D3B] shadow-sm animate-pulse'
                : 'bg-[#F4EFE6] dark:bg-[#18283E] text-[#0F1B2B] dark:text-[#E6EDF5] border-[#EAE3D2] dark:border-[#243954] hover:border-[#E06D3B]'
            }`}
            title={isPlaying ? `Playing: ${currentEpisode?.title}` : "Listen to Podcast"}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                <span className="truncate max-w-[110px]">Ep. 0{currentEpisode?.episodeNumber}</span>
              </>
            ) : (
              <>
                <Headphones className="w-3.5 h-3.5 text-[#E06D3B]" />
                <span>Listen</span>
              </>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDark}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 text-[#4A5E78] dark:text-[#94A9C4] hover:text-[#0F1B2B] dark:hover:text-white bg-[#F4EFE6] dark:bg-[#18283E] border border-[#EAE3D2] dark:border-[#243954] rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E06D3B] cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#0F1B2B]" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-[#0F1B2B] dark:text-white bg-[#F4EFE6] dark:bg-[#18283E] border border-[#EAE3D2] dark:border-[#243954] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E06D3B] cursor-pointer"
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

          <div className="pt-3 border-t border-[#EAE3D2] dark:border-[#223347] space-y-2">
            <button
              onClick={() => handleNavClick('profile')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#F4EFE6] dark:bg-[#18283E] text-xs font-semibold text-[#0F1B2B] dark:text-white"
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#E06D3B]" />
                <span>My Saved Stories &amp; Library ({favorites.length})</span>
              </span>
              <span>→</span>
            </button>

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
