import React from 'react';
import { shopImages } from '../data/barberData';
import { siteConfig } from '../config';
import { Calendar, Compass, ShieldCheck, Star } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#0e0f12] py-16 sm:py-24 border-b border-[#20222a]">
      {/* Background ambience */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src={shopImages.hero}
          alt="Crown & Blade Barber Co. Interior"
          className="h-full w-full object-cover object-center filter grayscale contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12] via-[#0e0f12]/80 to-[#0e0f12]/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet kicker */}
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#c99b4d]">
              <span>Handcrafted In Mill Quarter</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2011</span>
              <span aria-hidden="true">·</span>
              <span>Four Master Chairs</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#f5f6f8] text-balance leading-[1.1]">
              Every cut is architecture for your face.
            </h1>

            <p className="max-w-2xl text-base sm:text-lg text-[#9ea3b0] leading-relaxed">
              We reject rush-job ten-minute haircuts. At {siteConfig.shopName}, our master barbers study your skull geometry, hair grain, and personal lifestyle before the shears touch a single strand.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2.5 rounded-sm bg-[#c99b4d] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0e0f12] transition-all hover:bg-[#d6b374] active:scale-[0.98] cursor-pointer shadow-lg shadow-[#c99b4d]/10"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Your Chair</span>
              </button>

              <button
                onClick={onExploreServices}
                className="flex items-center gap-2 rounded-sm border border-[#343844] bg-[#16181f]/80 px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-[#d4d7e0] transition-colors hover:border-[#c99b4d]/60 hover:text-white cursor-pointer"
              >
                <Compass className="h-4 w-4" />
                <span>View Rate Card & Menu</span>
              </button>
            </div>

            {/* Micro Trust Proof */}
            <div className="pt-6 border-t border-[#20222a] flex flex-wrap items-center gap-6 text-xs text-[#8c919e]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#c99b4d]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#c99b4d]" />
                  ))}
                </div>
                <span className="font-semibold text-[#e2e4ea]">4.95 / 5.0</span>
                <span>(850+ Local Cuts)</span>
              </div>
              <div className="hidden sm:inline text-[#343844]">•</div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#c99b4d]" />
                <span>Sanitized Carbon Steel & Single-Use Blades</span>
              </div>
            </div>
          </div>

          {/* Marquee Image Card with live details */}
          <div className="lg:col-span-5">
            <div className="relative rounded-sm border border-[#262832] bg-[#14151a] p-2 shadow-2xl">
              <div className="relative aspect-4/3 overflow-hidden rounded-xs bg-[#1a1c22]">
                <img
                  src={shopImages.straightRazor}
                  alt="Traditional straight-razor shave with warm hot towel"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs uppercase tracking-wider text-[#c99b4d]">The Ritual</div>
                  <div className="font-serif text-lg text-[#f4f5f7]">Steamed Towels & Single Blade Precision</div>
                </div>
              </div>

              {/* Quick status bar */}
              <div className="mt-3 flex items-center justify-between px-3 py-2 text-xs border-t border-[#1f2129] text-[#9a9fae]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[#e2e4ea] font-medium">Chairs Active Today</span>
                </div>
                <span>Walk-ins welcome or book online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
