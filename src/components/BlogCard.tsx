import React from 'react';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { BlogArticle } from '../types';

interface BlogCardProps {
  article: BlogArticle;
  onSelect: (slug: string) => void;
  featured?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ article, onSelect, featured = false }) => {
  return (
    <article
      onClick={() => onSelect(article.slug)}
      className={`group cursor-pointer rounded-xl bg-white dark:bg-[#142030] border border-[#EAE3D2] dark:border-[#223347] overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#E06D3B]/40 flex flex-col ${
        featured ? 'md:grid md:grid-cols-12 md:gap-6' : ''
      }`}
    >
      {/* Cover Image */}
      <div
        className={`relative overflow-hidden bg-[#EAE3D2] dark:bg-[#1C2D42] ${
          featured ? 'md:col-span-6 h-64 md:h-full' : 'h-52 w-full'
        }`}
      >
        <img
          src={article.coverImage}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            // Elegant fallback container
            (e.target as HTMLImageElement).src = '/src/assets/images/hero_travel_journal_1790236025041.jpg';
          }}
        />
        {/* Subtle Category Kicker Tag on light scrim */}
        <div className="absolute top-3 left-3 bg-[#0F1B2B]/80 backdrop-blur-xs text-white text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-sm">
          {article.category}
        </div>
      </div>

      {/* Content Body */}
      <div className={`p-6 flex flex-col justify-between flex-1 ${featured ? 'md:col-span-6 md:py-8' : ''}`}>
        <div className="space-y-3">
          
          {/* Unboxed Metadata with Typographic Separators */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B85A6] dark:text-[#94A9C4]">
            <span className="flex items-center gap-1 font-medium text-[#2B6E70] dark:text-[#39888B]">
              <MapPin className="w-3 h-3" />
              {article.location.city}, {article.location.country}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className={`font-serif font-bold text-[#0F1B2B] dark:text-white group-hover:text-[#E06D3B] transition-colors leading-snug ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}>
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[#4A5E78] dark:text-[#94A9C4] line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Tags & Action Link */}
        <div className="pt-5 mt-4 border-t border-[#F4EFE6] dark:border-[#223347]/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#6B85A6] dark:text-[#6B85A6] truncate max-w-[70%]">
            {article.tags.slice(0, 2).map((t, idx) => (
              <span key={t}>
                #{t}{idx < Math.min(article.tags.length - 1, 1) ? ' ' : ''}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F1B2B] dark:text-[#E06D3B] group-hover:translate-x-1 transition-transform">
            Read Story <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
