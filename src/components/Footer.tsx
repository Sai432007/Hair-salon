import React from 'react';
import { siteConfig } from '../config';
import { Scissors, Phone, MapPin, Calendar } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onNavigateSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigateSection }) => {
  return (
    <footer className="border-t border-[#1f2129] bg-[#0b0c0f] text-[#898e9d] py-14 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#181a20]">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-7 w-7 items-center justify-center rounded-xs bg-[#c99b4d]/10 text-[#d6b374] border border-[#c99b4d]/30">
                <Scissors className="h-3.5 w-3.5" />
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-[#f3f4f7]">
                {siteConfig.shopName}
              </span>
            </div>
            <p className="max-w-md text-[#888d9c] leading-relaxed">
              Dedicated to the preservation and perfection of traditional men's grooming. Tailored tapers, skin fades, hot lather straight-razor shaves, and custom beard sculpting in Mill Quarter.
            </p>
            <div className="text-[11px] text-[#c99b4d]">
              Walk-ins welcome based on chair availability · Appointments guaranteed
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <div className="font-serif text-sm font-semibold text-white">Navigation</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services & Rate Card
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('barbers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Master Craftsmen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('style-guide')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Face Shape Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('blog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Grooming Journal (10 Guides)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('location')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hours & Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Action & Contact */}
          <div className="space-y-3">
            <div className="font-serif text-sm font-semibold text-white">Appointments</div>
            <div className="space-y-2 text-[#9da2b0]">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#c99b4d] shrink-0" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#c99b4d] shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white">
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 rounded-sm bg-[#c99b4d] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0e0f12] hover:bg-[#d6b374] cursor-pointer"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Book a Chair</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#666a77]">
          <div>
            © {new Date().getFullYear()} {siteConfig.shopName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Crafted for Vercel Deployment</span>
            <span aria-hidden="true">·</span>
            <span>Zero Slop Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
