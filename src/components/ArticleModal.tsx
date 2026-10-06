import React, { useState } from 'react';
import { BlogArticle } from '../data/blogArticles';
import { X, Clock, Calendar, Share2, Check, ArrowLeft, BookOpen, Lightbulb } from 'lucide-react';

interface ArticleModalProps {
  article: BlogArticle | null;
  onClose: () => void;
  onSelectArticle: (article: BlogArticle) => void;
  allArticles: BlogArticle[];
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onSelectArticle,
  allArticles,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  if (!article) return null;

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}#blog-${article.slug}`;
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-sm border border-[#2b2e3a] bg-[#121318] text-[#e2e4ea] shadow-2xl">
        {/* Top Control Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#21232d] bg-[#121318]/95 px-6 py-4 backdrop-blur-md">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs text-[#959aa7] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Journal</span>
          </button>

          <div className="flex items-center gap-4">
            {/* Font size toggle */}
            <div className="flex items-center text-xs text-[#7d8290] gap-1">
              <span className="text-[10px] uppercase tracking-wider">Text:</span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded-xs cursor-pointer ${
                  fontSize === 'normal' ? 'bg-[#222530] text-white' : 'hover:text-white'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 text-sm font-semibold rounded-xs cursor-pointer ${
                  fontSize === 'large' ? 'bg-[#222530] text-white' : 'hover:text-white'
                }`}
              >
                A+
              </button>
            </div>

            {/* Share button */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 text-xs text-[#c99b4d] hover:text-[#e4cfa3] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Link</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="rounded-xs p-1 text-[#8b909f] hover:bg-[#1d1f27] hover:text-white cursor-pointer"
              aria-label="Close article"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="px-6 py-8 sm:px-12 sm:py-10 max-w-3xl mx-auto">
          {/* Metadata - Clean Unboxed Text with Separators */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#8c919e] mb-4">
            <span className="text-[#c99b4d] font-medium">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{article.publishDate}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{article.readTimeMinutes} min read</span>
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl text-[#f5f6f8] font-medium leading-tight mb-6">
            {article.title}
          </h1>

          {/* Author Byline */}
          <div className="flex items-center gap-3 border-y border-[#20222a] py-3.5 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xs bg-[#c99b4d]/10 border border-[#c99b4d]/30 text-[#d6b374] font-serif font-bold text-sm">
              {article.author.name[0]}
            </div>
            <div>
              <div className="text-xs font-semibold text-[#e4cfa3]">
                Written by {article.author.name}
              </div>
              <div className="text-[11px] text-[#868b98]">{article.author.role} at Crown & Blade</div>
            </div>
          </div>

          {/* Article Introduction */}
          <p
            className={`font-serif italic text-[#c4c8d5] border-l-2 border-[#c99b4d] pl-4 mb-8 leading-relaxed ${
              fontSize === 'large' ? 'text-lg' : 'text-base'
            }`}
          >
            "{article.content.introduction}"
          </p>

          {/* Key Takeaways Box */}
          <div className="mb-10 rounded-xs bg-[#161820] border border-[#262834] p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c99b4d] mb-3">
              <BookOpen className="h-4 w-4" />
              <span>Key Barbershop Takeaways</span>
            </div>
            <ul className="space-y-2">
              {article.content.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#b4b9c7]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c99b4d] mt-2 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Sections */}
          <div className="space-y-8">
            {article.content.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl text-[#f2f4f7] font-medium pt-2">
                  {section.heading}
                </h2>
                <div
                  className={`space-y-3 text-[#9da2b0] leading-relaxed ${
                    fontSize === 'large' ? 'text-base' : 'text-sm'
                  }`}
                >
                  {section.body.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {section.proTip && (
                  <div className="mt-4 flex items-start gap-3 rounded-xs bg-[#1c1e27] border border-[#2d303d] p-4 text-xs text-[#d0d3de]">
                    <Lightbulb className="h-4 w-4 text-[#c99b4d] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#e4cfa3]">Master Tip: </span>
                      <span>{section.proTip}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="mt-10 border-t border-[#20222a] pt-6 space-y-3">
            <h3 className="font-serif text-lg text-[#f4f5f8] font-medium">Final Thoughts</h3>
            <p className="text-sm text-[#9da2b0] leading-relaxed">
              {article.content.conclusion}
            </p>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 border-t border-[#232630] pt-8">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7e8391] mb-4">
                More in {article.category}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="p-4 rounded-xs bg-[#161820] border border-[#262834] hover:border-[#c99b4d]/50 cursor-pointer transition-all"
                  >
                    <div className="text-[11px] text-[#c99b4d] mb-1">{rel.category}</div>
                    <div className="text-xs font-serif text-[#f2f4f7] font-semibold line-clamp-2">
                      {rel.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
