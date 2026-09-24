import React from 'react';
import { Bookmark, Headphones, Mail, User, LogOut, ArrowRight, Heart, Sparkles, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BLOG_ARTICLES } from '../data/blogs';
import { PODCAST_EPISODES } from '../data/podcasts';
import { BlogCard } from '../components/BlogCard';
import { EpisodeCard } from '../components/EpisodeCard';

interface ProfilePageProps {
  onNavigate: (path: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const {
    user,
    isAuthenticated,
    logout,
    openAuthModal,
    favorites,
    subscriptions,
    newsletterEmail
  } = useAuth();

  const favoriteArticles = BLOG_ARTICLES.filter((a) => favorites.includes(a.slug));
  const subscribedEpisodes = PODCAST_EPISODES.filter((ep) => subscriptions.includes(ep.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      
      {/* Profile Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0F1B2B] via-[#142030] to-[#1C2D42] text-white border border-[#243954] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={user?.avatar || '/src/assets/images/creator_portrait_1790236082709.jpg'}
              alt={user?.name || 'Traveler'}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#E06D3B] shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-[#0F1B2B] rounded-full" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {isAuthenticated && user ? user.name : 'Guest Explorer'}
              </h1>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase font-semibold bg-[#E06D3B]/20 text-[#E9865A] border border-[#E06D3B]/30">
                {isAuthenticated ? 'Passport Member' : 'Local Guest'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#94A9C4]">
              {isAuthenticated && user ? user.email : 'Preferences saved locally on this browser'}
            </p>
            <p className="text-xs text-[#6B85A6] font-mono">
              {user?.joinedDate || 'Active Explorer'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#E06D3B] hover:bg-[#C75525] text-white shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Sign In / Create Account</span>
            </button>
          )}
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-[#F4EFE6] dark:bg-[#142030] border border-[#EAE3D2] dark:border-[#223347] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#E06D3B]/10 text-[#E06D3B] flex items-center justify-center shrink-0">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-serif text-[#0F1B2B] dark:text-white">
              {favoriteArticles.length}
            </div>
            <div className="text-xs text-[#6B85A6] dark:text-[#94A9C4]">Bookmarked Articles</div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#F4EFE6] dark:bg-[#142030] border border-[#EAE3D2] dark:border-[#223347] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2B6E70]/10 text-[#2B6E70] dark:text-[#39888B] flex items-center justify-center shrink-0">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-serif text-[#0F1B2B] dark:text-white">
              {subscribedEpisodes.length}
            </div>
            <div className="text-xs text-[#6B85A6] dark:text-[#94A9C4]">Saved Podcast Episodes</div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#F4EFE6] dark:bg-[#142030] border border-[#EAE3D2] dark:border-[#223347] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#0F1B2B] dark:text-white">
              {newsletterEmail || user?.newsletterSubscribed ? 'Subscribed' : 'Not Subscribed'}
            </div>
            <div className="text-xs text-[#6B85A6] dark:text-[#94A9C4]">Field Dispatch Letters</div>
          </div>
        </div>
      </div>

      {/* Bookmarked Articles Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#EAE3D2] dark:border-[#223347] pb-4">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#E06D3B]" />
            <h2 className="font-serif text-2xl font-bold text-[#0F1B2B] dark:text-white">
              Your Bookmarked Stories ({favoriteArticles.length})
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="text-xs font-semibold text-[#2B6E70] dark:text-[#39888B] hover:text-[#E06D3B] transition-colors inline-flex items-center gap-1"
          >
            <span>Explore More Stories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {favoriteArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteArticles.map((article) => (
              <BlogCard
                key={article.id}
                article={article}
                onSelect={(slug) => onNavigate(`blog-article-${slug}`)}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#F4EFE6] dark:bg-[#142030] rounded-2xl border border-dashed border-[#D8CEB9] dark:border-[#223347] space-y-3">
            <BookOpen className="w-8 h-8 mx-auto text-[#6B85A6]" />
            <p className="text-sm text-[#4A5E78] dark:text-[#94A9C4]">
              You haven&apos;t saved any articles to your reading list yet. Click the bookmark icon on any story to read it later.
            </p>
            <button
              onClick={() => onNavigate('blog')}
              className="px-4 py-2 bg-[#0F1B2B] dark:bg-[#E06D3B] text-white text-xs font-semibold rounded-lg"
            >
              Browse Travel Articles
            </button>
          </div>
        )}
      </section>

      {/* Saved / Subscribed Podcasts Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#EAE3D2] dark:border-[#223347] pb-4">
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-[#2B6E70] dark:text-[#39888B]" />
            <h2 className="font-serif text-2xl font-bold text-[#0F1B2B] dark:text-white">
              Your Subscribed Audio Episodes ({subscribedEpisodes.length})
            </h2>
          </div>
          <button
            onClick={() => onNavigate('podcast')}
            className="text-xs font-semibold text-[#2B6E70] dark:text-[#39888B] hover:text-[#E06D3B] transition-colors inline-flex items-center gap-1"
          >
            <span>Podcast Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {subscribedEpisodes.length > 0 ? (
          <div className="space-y-4">
            {subscribedEpisodes.map((ep) => (
              <EpisodeCard
                key={ep.id}
                episode={ep}
                onSelectBlog={(blogSlug) => onNavigate(`blog-article-${blogSlug}`)}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#F4EFE6] dark:bg-[#142030] rounded-2xl border border-dashed border-[#D8CEB9] dark:border-[#223347] space-y-3">
            <Headphones className="w-8 h-8 mx-auto text-[#6B85A6]" />
            <p className="text-sm text-[#4A5E78] dark:text-[#94A9C4]">
              No podcast episodes saved yet. Subscribe or favorite episodes on the podcast page to queue them here.
            </p>
            <button
              onClick={() => onNavigate('podcast')}
              className="px-4 py-2 bg-[#2B6E70] text-white text-xs font-semibold rounded-lg"
            >
              Explore Podcast Episodes
            </button>
          </div>
        )}
      </section>

    </div>
  );
};
