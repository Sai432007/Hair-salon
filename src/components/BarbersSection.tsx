import React from 'react';
import { barbersData, BarberMember, shopImages } from '../data/barberData';
import { Award, Calendar, Scissors, Sparkles } from 'lucide-react';

interface BarbersSectionProps {
  onSelectBarberToBook: (barber: BarberMember) => void;
}

export const BarbersSection: React.FC<BarbersSectionProps> = ({ onSelectBarberToBook }) => {
  return (
    <section id="barbers" className="bg-[#0e0f13] py-20 border-b border-[#20222a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#c99b4d] font-semibold">
              The Masters of the Chair
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f5f8] font-normal">
              Four Craftsmen. Decades of Dedicated Blade Work.
            </h2>
            <p className="text-base text-[#9297a5] leading-relaxed">
              We do not employ apprentices or unvetted stylists. Each chair at Crown & Blade is commanded by a career barber who treats the trade as fine sculpture. Pick your craftsman or request first available.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-sm border border-[#232630] bg-[#14151b] p-3">
              <div className="relative aspect-16/10 overflow-hidden rounded-xs">
                <img
                  src={shopImages.masterStyling}
                  alt="Master barber cutting with Japanese steel shears"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-xs uppercase text-[#c99b4d] font-medium">Scissor Craft</div>
                  <div className="text-sm font-serif">Precision Shear Architecture</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {barbersData.map((barber) => (
            <div
              key={barber.id}
              className="group flex flex-col justify-between rounded-sm border border-[#242732] bg-[#121318] p-5 transition-all hover:border-[#c99b4d]/60"
            >
              <div className="space-y-4">
                {/* Header with nickname */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#f2f4f7] group-hover:text-[#e4cfa3] transition-colors">
                      {barber.name}
                    </h3>
                    <div className="text-xs text-[#8e93a0]">"{barber.nickname}"</div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#c99b4d] bg-[#c99b4d]/10 px-2 py-0.5 rounded-xs border border-[#c99b4d]/20 tabular-nums">
                    {barber.experienceYears} Yrs Exp
                  </span>
                </div>

                {/* Role & specialty */}
                <div className="border-b border-[#1f2129] pb-3">
                  <div className="text-xs font-medium text-[#c4c7cf] mb-1">{barber.role}</div>
                  <div className="text-[12px] text-[#9398a6] leading-snug">
                    <span className="text-[#757a88]">Focus:</span> {barber.specialty}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-[#8c919e] leading-relaxed">
                  {barber.bio}
                </p>

                {/* Favorite product */}
                <div className="rounded-xs bg-[#171920] p-2.5 text-[11px] text-[#989da9] border border-[#20222a]">
                  <div className="font-semibold text-[#c99b4d] mb-0.5 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    <span>Go-To Weapon:</span>
                  </div>
                  <div>{barber.favoriteProduct}</div>
                </div>
              </div>

              {/* Schedule and action */}
              <div className="mt-5 pt-4 border-t border-[#1e2028] space-y-3">
                <div className="text-[11px] text-[#7d8290]">
                  <span className="font-medium text-[#a0a5b2]">In Chair:</span> {barber.daysAvailable.slice(0, 3).join(', ')}...
                </div>

                <button
                  onClick={() => onSelectBarberToBook(barber)}
                  className="w-full flex items-center justify-center gap-2 rounded-sm bg-[#1e212b] py-2 text-xs font-semibold uppercase tracking-wider text-[#d4d7e0] transition-colors hover:bg-[#c99b4d] hover:text-[#0e0f12] cursor-pointer"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Book with {barber.nickname}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
