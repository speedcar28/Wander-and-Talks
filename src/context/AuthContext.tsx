import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, name?: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  favorites: string[]; // blog slugs
  toggleFavorite: (blogSlug: string) => void;
  isFavorite: (blogSlug: string) => boolean;
  subscriptions: string[]; // podcast IDs or topic
  toggleSubscription: (podcastId: string) => void;
  isSubscribed: (podcastId: string) => boolean;
  newsletterEmail: string | null;
  subscribeNewsletter: (email: string) => void;
  authModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'signup';
}

const STORAGE_KEY_USER = 'wander_talk_user';
const STORAGE_KEY_FAVS = 'wander_talk_favorites';
const STORAGE_KEY_SUBS = 'wander_talk_subscriptions';
const STORAGE_KEY_NEWS = 'wander_talk_newsletter';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user profile', e);
      }
    }
    return null;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_FAVS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
    return ['old-dubai-creek-street-food-guide', 'sunrise-sharjah-desert-mleiha-guide'];
  });

  const [subscriptions, setSubscriptions] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SUBS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse subscriptions', e);
      }
    }
    return ['ep-01', 'ep-03'];
  });

  const [newsletterEmail, setNewsletterEmail] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY_NEWS);
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SUBS, JSON.stringify(subscriptions));
  }, [subscriptions]);

  const login = async (email: string, _pass: string, name?: string): Promise<boolean> => {
    const userProfile: UserProfile = {
      id: 'usr-' + Date.now(),
      name: name || email.split('@')[0],
      email: email,
      avatar: '/src/assets/images/creator_portrait_1790236082709.jpg',
      joinedDate: 'Joined recently',
      favoriteBlogSlugs: favorites,
      subscribedPodcastIds: subscriptions,
      newsletterSubscribed: !!newsletterEmail
    };
    setUser(userProfile);
    setAuthModalOpen(false);
    return true;
  };

  const signup = async (name: string, email: string, _pass: string): Promise<boolean> => {
    const userProfile: UserProfile = {
      id: 'usr-' + Date.now(),
      name: name,
      email: email,
      avatar: '/src/assets/images/creator_portrait_1790236082709.jpg',
      joinedDate: 'Joined ' + new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      favoriteBlogSlugs: favorites,
      subscribedPodcastIds: subscriptions,
      newsletterSubscribed: true
    };
    setUser(userProfile);
    setAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = (blogSlug: string) => {
    setFavorites((prev) => {
      if (prev.includes(blogSlug)) {
        return prev.filter((s) => s !== blogSlug);
      } else {
        return [...prev, blogSlug];
      }
    });
  };

  const isFavorite = (blogSlug: string) => {
    return favorites.includes(blogSlug);
  };

  const toggleSubscription = (podcastId: string) => {
    setSubscriptions((prev) => {
      if (prev.includes(podcastId)) {
        return prev.filter((id) => id !== podcastId);
      } else {
        return [...prev, podcastId];
      }
    });
  };

  const isSubscribed = (podcastId: string) => {
    return subscriptions.includes(podcastId);
  };

  const subscribeNewsletter = (email: string) => {
    setNewsletterEmail(email);
    localStorage.setItem(STORAGE_KEY_NEWS, email);
    if (user) {
      setUser({ ...user, newsletterSubscribed: true });
    }
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        favorites,
        toggleFavorite,
        isFavorite,
        subscriptions,
        toggleSubscription,
        isSubscribed,
        newsletterEmail,
        subscribeNewsletter,
        authModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
