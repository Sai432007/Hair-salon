/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BarbersSection } from './components/BarbersSection';
import { FaceShapeGuideSection } from './components/FaceShapeGuideSection';
import { BlogSection } from './components/BlogSection';
import { ArticleModal } from './components/ArticleModal';
import { ReviewsSection } from './components/ReviewsSection';
import { ShopInfoSection } from './components/ShopInfoSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ServiceItem, BarberMember } from './data/barberData';
import { blogArticles, BlogArticle } from './data/blogArticles';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<BarberMember | null>(null);
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle direct hash navigation (e.g. for shared article links #blog-slug)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#blog-')) {
        const slug = hash.replace('#blog-', '');
        const matched = blogArticles.find((a) => a.slug === slug);
        if (matched) {
          setActiveArticle(matched);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenBooking = (service?: ServiceItem, barber?: BarberMember) => {
    setSelectedService(service || null);
    setSelectedBarber(barber || null);
    setIsBookingOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0f13] text-[#e3e5ed] font-sans selection:bg-[#c99b4d] selection:text-black">
      {/* 3-Zone Fixed Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={() => handleNavigateSection('services')}
        />

        {/* Rate Card & Services */}
        <ServicesSection
          onSelectServiceToBook={(service) => handleOpenBooking(service)}
        />

        {/* Master Craftsmen Team */}
        <BarbersSection
          onSelectBarberToBook={(barber) => handleOpenBooking(undefined, barber)}
        />

        {/* Face Shape & Consultation Guide */}
        <FaceShapeGuideSection />

        {/* Customer Reviews & Social Proof */}
        <ReviewsSection />

        {/* Blog / Journal: 10 Articles */}
        <BlogSection
          onSelectArticle={(article) => setActiveArticle(article)}
        />

        {/* Shop Details, Hours & Location */}
        <ShopInfoSection />
      </main>

      {/* Quiet Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onNavigateSection={handleNavigateSection}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedService={selectedService}
        preSelectedBarber={selectedBarber}
      />

      {/* Article Reader Modal */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onSelectArticle={(article) => setActiveArticle(article)}
        allArticles={blogArticles}
      />
    </div>
  );
}
