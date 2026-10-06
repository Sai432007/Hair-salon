import React, { useState } from 'react';
import { siteConfig } from '../config';
import { Calendar, Menu, X, Scissors, Clock, MapPin, Phone } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  onNavigateSection: (id: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onNavigateSection,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: 'services' },
    { label: 'Barbers', href: 'barbers' },
    { label: 'Face Shape Guide', href: 'style-guide' },
    { label: 'Journal', href: 'blog' },
    { label: 'Hours & Location', href: 'location' },
  ];

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#262830] bg-[#121317]/95 backdrop-blur-md">
      {/* Top micro bar for phone & announcement */}
      <div className="border-b border-[#1f2127] bg-[#0c0d10] px-4 py-1.5 text-xs text-[#9a9ea8]">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#d6b374]">
              <Clock className="h-3.5 w-3.5" />
              <span>Today: 9:00 AM - 7:00 PM</span>
            </span>
            <span className="hidden sm:inline text-[#4a4e5a]">|</span>
            <span className="hidden sm:flex items-center gap-1.5 text-[#b0b4be]">
              <MapPin className="h-3.5 w-3.5 text-[#888c96]" />
              <span>{siteConfig.address}</span>
            </span>
          </div>
          <a
            href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-1 text-[#d6b374] hover:underline"
          >
            <Phone className="h-3 w-3" />
            <span>{siteConfig.phone}</span>
          </a>
        </div>
      </div>

      {/* Main 3-Zone Header Contract */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('hero')}
          className="text-left group flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#c99b4d]/10 border border-[#c99b4d]/30 text-[#d6b374]">
            <Scissors className="h-4 w-4" />
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#f2f3f5] block">
              {siteConfig.shopName}
            </span>
          </div>
        </button>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#a0a5b2]">
          {navLinks.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`transition-colors cursor-pointer py-1 ${
                  isActive
                    ? 'text-[#e4cfa3] border-b-2 border-[#c99b4d]'
                    : 'hover:text-[#f2f3f5]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 rounded-sm bg-[#c99b4d] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0e0f12] transition-all hover:bg-[#d6b374] active:scale-[0.98] cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Book Chair</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-sm p-1.5 text-[#b0b4be] hover:bg-[#1a1c22] md:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#262830] bg-[#121317] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-left py-2 text-sm font-medium text-[#c4c7cf] hover:text-[#e4cfa3] border-b border-[#1c1e24] cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-sm bg-[#c99b4d] py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0e0f12]"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment Now</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
