import React, { useState } from 'react';
import { blogArticles, BlogArticle } from '../data/blogArticles';
import { Search, Clock, Calendar, ArrowRight, BookOpen, User } from 'lucide-react';

interface BlogSectionProps {
  onSelectArticle: (article: BlogArticle) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectArticle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'Haircut & Fades',
    'Shaving & Ritual',
    'Beard Care',
    'Styling Products',
    'Hair & Scalp Science',
    'Barbershop Culture',
  ];

  const filteredArticles = blogArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="bg-[#0f1014] py-20 border-b border-[#20222a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c99b4d] font-semibold">
              <BookOpen className="h-4 w-4" />
              <span>The Barber's Ledger · 10 Articles</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f5f8] font-normal">
              Grooming Guides, Shave Science & Craft
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-[#9297a5]">
              Straight from our chairs to your routine. Master guidance on skull fades, thermal razor shaves, carrier oils, and scalp health.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#757a88]" />
            <input
              type="text"
              placeholder="Search guides, fades, oils..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-sm border border-[#2b2e3a] bg-[#161820] py-2 pl-9 pr-4 text-xs text-[#e4e7ee] placeholder-[#6d7280] focus:border-[#c99b4d] focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 mb-10 pb-2 border-b border-[#1c1e26]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer capitalize ${
                selectedCategory === cat
                  ? 'bg-[#c99b4d] text-[#0e0f12] font-semibold'
                  : 'text-[#8e93a2] hover:text-[#f4f5f8] hover:bg-[#1b1d25]'
              }`}
            >
              {cat === 'all' ? 'All Guides (10)' : cat}
            </button>
          ))}
        </div>

        {/* Articles List / Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#262832] rounded-sm p-8">
            <p className="text-sm text-[#8c919e]">No grooming articles matched your search query.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs text-[#c99b4d] underline cursor-pointer"
            >
              Reset filters and view all 10 articles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group flex flex-col justify-between rounded-sm border border-[#22252f] bg-[#13141a] p-6 transition-all hover:border-[#c99b4d]/60 hover:bg-[#161820] cursor-pointer"
              >
                <div className="space-y-3.5">
                  {/* Clean unboxed metadata (anti-pill) */}
                  <div className="flex items-center gap-2 text-xs text-[#828795]">
                    <span className="text-[#c99b4d] font-semibold">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTimeMinutes} min</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg text-[#f4f5f8] font-normal group-hover:text-[#e4cfa3] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-[#959aa7] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                {/* Bottom author and action */}
                <div className="mt-6 pt-4 border-t border-[#1d1f27] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#7d8290]">
                    <User className="h-3.5 w-3.5 text-[#c99b4d]" />
                    <span className="truncate max-w-[140px]">{article.author.name}</span>
                  </div>

                  <span className="flex items-center gap-1 text-xs font-semibold text-[#c99b4d] group-hover:translate-x-0.5 transition-transform">
                    <span>Read Guide</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
