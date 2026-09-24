import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, BookOpen, Tag as TagIcon, ArrowUpDown, Sparkles } from 'lucide-react';
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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'readTimeAsc' | 'readTimeDesc'>('newest');

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    BLOG_ARTICLES.forEach((a) => {
      a.tags.forEach((t) => tagsSet.add(t));
    });
    return Array.from(tagsSet).sort();
  }, []);

  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      // 1. Category Filter
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;

      // 2. Tag Filter
      const matchesTag = !selectedTag || article.tags.includes(selectedTag);

      // 3. Deep Full-Text Keyword Search across title, subtitle, excerpt, author, location, tags, and section paragraphs
      const q = searchQuery.toLowerCase().trim();
      let matchesQuery = true;
      if (q) {
        const inTitle = article.title.toLowerCase().includes(q);
        const inSubtitle = article.subtitle.toLowerCase().includes(q);
        const inExcerpt = article.excerpt.toLowerCase().includes(q);
        const inCity = article.location.city.toLowerCase().includes(q);
        const inCountry = article.location.country.toLowerCase().includes(q);
        const inAuthor = article.author.name.toLowerCase().includes(q);
        const inTags = article.tags.some((t) => t.toLowerCase().includes(q));
        const inLead = article.content.leadParagraph.toLowerCase().includes(q);
        const inSections = article.content.sections.some(
          (s) =>
            (s.heading && s.heading.toLowerCase().includes(q)) ||
            s.body.some((p) => p.toLowerCase().includes(q)) ||
            (s.pullQuote && s.pullQuote.toLowerCase().includes(q))
        );
        const inTips = article.content.travelTips?.some((t) => t.toLowerCase().includes(q));

        matchesQuery =
          inTitle ||
          inSubtitle ||
          inExcerpt ||
          inCity ||
          inCountry ||
          inAuthor ||
          inTags ||
          inLead ||
          inSections ||
          !!inTips;
      }

      return matchesCategory && matchesTag && matchesQuery;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return b.id.localeCompare(a.id);
      }
      const timeA = parseInt(a.readTime.replace(/\D/g, ''), 10) || 5;
      const timeB = parseInt(b.readTime.replace(/\D/g, ''), 10) || 5;
      if (sortBy === 'readTimeAsc') return timeA - timeB;
      if (sortBy === 'readTimeDesc') return timeB - timeA;
      return 0;
    });
  }, [selectedCategory, selectedTag, searchQuery, sortBy]);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedTag !== null || sortBy !== 'newest';

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedTag(null);
    setSearchQuery('');
    setSortBy('newest');
  };

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

      {/* Search & Advanced Filters Bar */}
      <div className="space-y-6 bg-[#F4EFE6] dark:bg-[#142030] p-6 sm:p-7 rounded-2xl border border-[#EAE3D2] dark:border-[#223347] shadow-xs">
        
        {/* Search Input & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B85A6]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across titles, full stories, coordinates, tags, or gear notes..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-white dark:bg-[#0F1B2B] text-[#0F1B2B] dark:text-white placeholder-[#6B85A6] rounded-xl border border-[#D8CEB9] dark:border-[#223347] focus:outline-none focus:border-[#E06D3B] focus:ring-1 focus:ring-[#E06D3B] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B85A6] hover:text-[#0F1B2B] dark:hover:text-white p-1 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 text-xs self-end sm:self-auto shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#6B85A6]" />
            <span className="text-[#6B85A6] font-mono hidden md:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white dark:bg-[#0F1B2B] text-[#0F1B2B] dark:text-[#E6EDF5] border border-[#D8CEB9] dark:border-[#223347] text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-[#E06D3B]"
            >
              <option value="newest">Newest First</option>
              <option value="readTimeAsc">Shortest Read (&lt; 6 min)</option>
              <option value="readTimeDesc">Deep Long-form (&gt; 7 min)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Buttons */}
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

        {/* Tag Filter Chips Bar */}
        <div className="space-y-2 pt-2 border-t border-[#EAE3D2] dark:border-[#223347]">
          <div className="flex items-center justify-between text-xs font-mono text-[#6B85A6] dark:text-[#94A9C4]">
            <div className="flex items-center gap-1.5">
              <TagIcon className="w-3.5 h-3.5" />
              <span>Browse by Topic Tags:</span>
            </div>
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
              >
                Clear tag filter (#{selectedTag})
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
            {allTags.map((tag) => {
              const isTagActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isTagActive ? null : tag)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                    isTagActive
                      ? 'bg-[#2B6E70] text-white font-bold shadow-xs'
                      : 'bg-white/80 dark:bg-[#18283E]/80 text-[#2B6E70] dark:text-[#39888B] border border-[#EAE3D2] dark:border-[#243954] hover:border-[#2B6E70]'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Result Metrics and Active Filter Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#6B85A6] dark:text-[#94A9C4] px-1 font-mono">
        <div className="flex items-center gap-2">
          <span>
            Found <strong className="text-[#0F1B2B] dark:text-white">{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'matching story' : 'matching stories'}
          </span>
          {selectedTag && (
            <span className="bg-[#2B6E70]/15 text-[#2B6E70] dark:text-[#39888B] px-2 py-0.5 rounded text-[11px]">
              Tag: #{selectedTag}
            </span>
          )}
          {searchQuery && (
            <span className="bg-[#E06D3B]/15 text-[#E06D3B] px-2 py-0.5 rounded text-[11px]">
              &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetAllFilters}
            className="text-[#E06D3B] hover:underline cursor-pointer font-semibold"
          >
            Reset all search filters
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
            We couldn&apos;t find any stories matching your filter keywords or selected tags.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-2 px-5 py-2.5 bg-[#0F1B2B] dark:bg-[#E06D3B] hover:bg-[#1C2D42] dark:hover:bg-[#C75525] text-white text-xs font-semibold rounded-lg cursor-pointer transition-all"
          >
            Clear All Filters &amp; Show Everything
          </button>
        </div>
      )}

    </div>
  );
};
