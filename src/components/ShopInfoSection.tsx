import React from 'react';
import { siteConfig } from '../config';
import { shopImages } from '../data/barberData';
import { Clock, MapPin, Phone, Car, Sparkles, Coffee } from 'lucide-react';

export const ShopInfoSection: React.FC = () => {
  // Determine if currently open based on local day and hour
  const now = new Date();
  const currentDayIndex = now.getDay(); // 0 is Sunday, 1 is Monday...
  const currentHour = now.getHours() + now.getMinutes() / 60;

  // Map 0..6 to our array (Monday is index 0 in siteConfig.hours)
  const dayMap = [6, 0, 1, 2, 3, 4, 5]; // Sunday -> 6, Mon -> 0, etc.
  const todayConfig = siteConfig.hours[dayMap[currentDayIndex]];
  const isOpenNow = currentHour >= todayConfig.open && currentHour < todayConfig.close;

  return (
    <section id="location" className="bg-[#0e0f13] py-20 border-b border-[#20222a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Shop details & Hours table */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest text-[#c99b4d] font-semibold">
                  Location & Hours
                </span>
                <span aria-hidden="true" className="text-[#3a3e4c]">·</span>
                {/* Live open/closed indicator */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`}
                  />
                  <span className={isOpenNow ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}>
                    {isOpenNow ? 'Open Now' : 'Closed Now'}
                  </span>
                </div>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f5f8] font-normal">
                Visit Us in Mill Quarter
              </h2>
              <p className="text-sm sm:text-base text-[#9297a5] mt-2">
                Located right off the historic cobblestones of River Street. Step in for an appointment or check chair availability for walk-ins.
              </p>
            </div>

            {/* Operating Hours Table */}
            <div className="rounded-sm border border-[#232631] bg-[#14151b] p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c99b4d] mb-4">
                <Clock className="h-4 w-4" />
                <span>Operating Hours</span>
              </div>

              <div className="space-y-2 text-xs divide-y divide-[#1e2029]">
                {siteConfig.hours.map((item, idx) => {
                  const isCurrentDay = dayMap[currentDayIndex] === idx;
                  return (
                    <div
                      key={item.day}
                      className={`flex justify-between items-center py-2 ${
                        isCurrentDay ? 'text-[#e4cfa3] font-semibold' : 'text-[#a1a6b4]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.day}
                        {isCurrentDay && (
                          <span className="text-[10px] text-[#c99b4d] font-normal">
                            (Today)
                          </span>
                        )}
                      </span>
                      <span className="tabular-nums font-mono text-xs">{item.hours}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Amenities & Parking */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-sm border border-[#20222a] bg-[#121317] p-4 text-xs text-[#a2a7b6] flex items-start gap-3">
                <Car className="h-4 w-4 text-[#c99b4d] shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-white mb-0.5">Complimentary Parking</div>
                  <div>Validated parking stalls available behind the Mill Quarter courtyard.</div>
                </div>
              </div>

              <div className="rounded-sm border border-[#20222a] bg-[#121317] p-4 text-xs text-[#a2a7b6] flex items-start gap-3">
                <Coffee className="h-4 w-4 text-[#c99b4d] shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-white mb-0.5">Shop Hospitality</div>
                  <div>Complimentary single-origin cold brew, espresso, and craft bourbon on pour.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Apothecary Products Showcase */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-sm border border-[#242732] bg-[#14151b] p-3 shadow-xl">
              <div className="relative aspect-4/3 overflow-hidden rounded-xs">
                <img
                  src={shopImages.apothecary}
                  alt="Apothecary beard oils, matte clays, and shaving tonics"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs uppercase text-[#c99b4d] font-medium">In-Shop Apothecary</div>
                  <div className="font-serif text-sm">Cold-Pressed Beard Oils & Volcanic Clays</div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="text-xs text-[#9aa0ae] leading-relaxed">
                  We formulate our own small-batch grooming apothecary in-house. Cold-pressed carrier oils, genuine bentonite clay, and sandalwood tonics available at the front counter.
                </div>

                <div className="pt-2 border-t border-[#1e2028] flex items-center justify-between text-xs">
                  <span className="text-[#c99b4d] font-medium flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Ask your barber for product samples</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="rounded-sm border border-[#252834] bg-[#13141a] p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#f2f4f8]">
                <MapPin className="h-4 w-4 text-[#c99b4d]" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#a2a6b4]">
                <Phone className="h-4 w-4 text-[#c99b4d]" />
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-[#e4cfa3] transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
