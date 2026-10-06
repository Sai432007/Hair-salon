import React from 'react';
import { reviewsData } from '../data/barberData';
import { Star, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="bg-[#101116] py-20 border-b border-[#20222a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#c99b4d] font-semibold">
            Community Sanctuary
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f5f8] font-normal">
            Voices from the Chair
          </h2>
          <p className="text-sm sm:text-base text-[#9297a5]">
            We measure our craft not in quick turnover, but in loyalty. Read reflections from gentlemen who trust us with their crown.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewsData.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between rounded-sm border border-[#242632] bg-[#14151c] p-6 shadow-sm"
            >
              <div className="space-y-3">
                {/* Stars and rating */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#c99b4d]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#c99b4d]" />
                    ))}
                  </div>
                  <Quote className="h-4 w-4 text-[#393d4c]" />
                </div>

                <p className="text-xs text-[#a4a9b8] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1e2029]">
                <div className="font-serif text-sm font-semibold text-[#f2f4f7]">
                  {rev.author}
                </div>
                {/* Clean unboxed metadata with separators */}
                <div className="text-[11px] text-[#787d8c] flex items-center gap-1.5 mt-0.5">
                  <span>{rev.service}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#c99b4d]">{rev.barber}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
