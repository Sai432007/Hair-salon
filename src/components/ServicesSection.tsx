import React, { useState } from 'react';
import { servicesData, ServiceItem } from '../data/barberData';
import { Clock, Check, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceToBook: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hair', label: 'Haircraft & Fades' },
    { id: 'shave', label: 'Straight Razor & Beard' },
    { id: 'combo', label: 'Signature Combos' },
    { id: 'treatments', label: 'Scalp & Revival' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? servicesData
      : servicesData.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="bg-[#101115] py-20 border-b border-[#20222a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#c99b4d] font-semibold">
              The Rate Card
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f5f8] font-normal">
              Menu of Handcrafted Services
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-[#9297a5]">
              Every appointment includes a detailed skull consultation, warm lather neck shave, and bespoke styling with our apothecary products.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-[#171920] border border-[#272a34] rounded-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#c99b4d] text-[#0e0f12] font-semibold'
                    : 'text-[#9ea3b0] hover:text-[#f4f5f8] hover:bg-[#1f222c]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`group relative rounded-sm border p-6 transition-all ${
                service.popular
                  ? 'border-[#c99b4d]/40 bg-[#14151b] hover:border-[#c99b4d]'
                  : 'border-[#232630] bg-[#121317] hover:border-[#383d4c]'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-serif text-[#f2f4f7] group-hover:text-[#e4cfa3] transition-colors">
                      {service.name}
                    </h3>
                    {service.popular && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#d6b374] bg-[#c99b4d]/10 border border-[#c99b4d]/30 px-1.5 py-0.5 rounded-xs">
                        <Sparkles className="h-2.5 w-2.5" />
                        Popular
                      </span>
                    )}
                  </div>
                  {/* Clean unboxed metadata with bullet separator */}
                  <div className="flex items-center gap-2 text-xs text-[#8c919e] mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-[#c99b4d]" />
                      <span>{service.durationMinutes} mins</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{service.category}</span>
                  </div>
                </div>

                {/* Price in tabular numbers */}
                <div className="text-right shrink-0">
                  <div className="text-2xl font-serif font-semibold text-[#e4cfa3] tabular-nums">
                    ${service.price}
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#9da2af] leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Inclusions */}
              <div className="mb-6 space-y-1.5 border-t border-[#1e2028] pt-4">
                <div className="text-[11px] font-medium uppercase tracking-wider text-[#7e8391] mb-2">
                  Service Includes:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {service.includes.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-[#b8bcc8]">
                      <Check className="h-3 w-3 text-[#c99b4d] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book button */}
              <button
                onClick={() => onSelectServiceToBook(service)}
                className="w-full flex items-center justify-center gap-2 rounded-sm border border-[#343844] bg-[#1a1c24] py-2.5 text-xs font-semibold uppercase tracking-wider text-[#e2e4ea] transition-all hover:bg-[#c99b4d] hover:text-[#0e0f12] hover:border-[#c99b4d] cursor-pointer"
              >
                <span>Select & Reserve Chair</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
