import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, BookOpen } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogs';
import { BlogCategory } from '../types';
import { BlogCard } from '../components/BlogCard';

interface BlogPageProps {
  onNavigate: (path: string) => void;
}

const CATEGORIES: BlogCategory[] = [
  'All',
  'UAE',
  'City Guides',
  'Nature',
  'Budget Travel',
  'Food',
  'Photography',
  'Travel Tips'
];

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.location.city.toLowerCase().includes(q) ||
        article.location.country.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Section */}
      <div className="space-y-4 max-w-3xl border-b border-[#EAE3D2] dark:border-[#223347] pb-8">
        <span className="text-xs font-mono tracking-widest uppercase text-[#E06D3B] font-semibold">
          THE WANDER JOURNAL
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#0F1B2B] dark:text-white">
          Field Notes, Essays &amp; Travel Guides
        </h1>
        <p className="text-base sm:text-lg text-[#4A5E78] dark:text-[#94A9C4] leading-relaxed">
          In-depth stories, budget road trip breakdowns, street photography techniques, and acoustic observations from the Arabian Peninsula and beyond.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-5 bg-[#F4EFE6] dark:bg-[#142030] p-6 rounded-2xl border border-[#EAE3D2] dark:border-[#223347]">
        
        {/* Search Input */}
        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B85A6]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, city, food, gear, or tag..."
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-white dark:bg-[#0F1B2B] text-[#0F1B2B] dark:text-white placeholder-[#6B85A6] rounded-xl border border-[#D8CEB9] dark:border-[#223347] focus:outline-none focus:border-[#E06D3B] focus:ring-1 focus:ring-[#E06D3B] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B85A6] hover:text-[#0F1B2B] dark:hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Buttons (Segmented Controls) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#6B85A6] dark:text-[#94A9C4]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter by Category:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#0F1B2B] dark:bg-[#E06D3B] text-white shadow-xs font-semibold'
                      : 'bg-white dark:bg-[#18283E] text-[#4A5E78] dark:text-[#94A9C4] border border-[#EAE3D2] dark:border-[#243954] hover:border-[#E06D3B] hover:text-[#0F1B2B] dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Result Metrics */}
      <div className="flex items-center justify-between text-xs text-[#6B85A6] dark:text-[#94A9C4] px-1 font-mono">
        <span>
          Showing <strong className="text-[#0F1B2B] dark:text-white">{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'article' : 'articles'}
          {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
        </span>
        {(searchQuery || selectedCategory !== 'All') && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-[#E06D3B] hover:underline cursor-pointer"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <BlogCard
              key={article.id}
              article={article}
              onSelect={(slug) => onNavigate(`blog-article-${slug}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-[#F4EFE6] dark:bg-[#142030] rounded-2xl border border-dashed border-[#D8CEB9] dark:border-[#223347] space-y-3">
          <BookOpen className="w-10 h-10 mx-auto text-[#6B85A6]" />
          <h3 className="font-serif text-xl font-bold text-[#0F1B2B] dark:text-white">
            No travel articles found
          </h3>
          <p className="text-sm text-[#4A5E78] dark:text-[#94A9C4] max-w-md mx-auto">
            We couldn&apos;t find any stories matching your filter criteria. Try clearing your search term or selecting &ldquo;All&rdquo;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-2 px-4 py-2 bg-[#0F1B2B] dark:bg-[#E06D3B] text-white text-xs font-semibold rounded-lg"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};
