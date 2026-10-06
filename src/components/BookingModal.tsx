import React, { useState } from 'react';
import { servicesData, barbersData, ServiceItem, BarberMember } from '../data/barberData';
import { siteConfig } from '../config';
import {
  X,
  Calendar,
  Clock,
  User,
  Scissors,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Download,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: ServiceItem | null;
  preSelectedBarber?: BarberMember | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedService,
  preSelectedBarber,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const [selectedService, setSelectedService] = useState<ServiceItem>(
    preSelectedService || servicesData[0]
  );
  const [selectedBarberId, setSelectedBarberId] = useState<string>(
    preSelectedBarber ? preSelectedBarber.id : 'any'
  );

  // Date selection (next 7 days)
  const today = new Date();
  const availableDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return {
      dateString: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].dateString);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00 AM');

  // Client info form
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [bookingCode, setBookingCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Time slots
  const morningSlots = ['09:15 AM', '10:00 AM', '10:45 AM', '11:30 AM'];
  const afternoonSlots = ['01:00 PM', '01:45 PM', '02:30 PM', '03:15 PM', '04:00 PM'];
  const eveningSlots = ['05:00 PM', '05:45 PM', '06:30 PM'];

  // Update selection if preSelected changes
  React.useEffect(() => {
    if (preSelectedService) setSelectedService(preSelectedService);
  }, [preSelectedService]);

  React.useEffect(() => {
    if (preSelectedBarber) setSelectedBarberId(preSelectedBarber.id);
  }, [preSelectedBarber]);

  if (!isOpen) return null;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    // Generate random reference code
    const code = `CB-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingCode(code);
    setStep(5);
  };

  const getBarberName = () => {
    if (selectedBarberId === 'any') return 'First Available Master Barber';
    const barber = barbersData.find((b) => b.id === selectedBarberId);
    return barber ? `${barber.name} ("${barber.nickname}")` : 'First Available';
  };

  const handleDownloadCalendar = () => {
    const title = `${selectedService.name} - ${siteConfig.shopName}`;
    const desc = `Barber Appointment at ${siteConfig.shopName}\\nService: ${selectedService.name} ($${selectedService.price})\\nBarber: ${getBarberName()}\\nAddress: ${siteConfig.address}`;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Crown and Blade Barber Co//Booking//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${desc}
LOCATION:${siteConfig.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `appointment-${bookingCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyBookingDetails = () => {
    const details = `Crown & Blade Appointment Confirmation:
Code: ${bookingCode}
Service: ${selectedService.name} ($${selectedService.price})
Barber: ${getBarberName()}
Date & Time: ${selectedDate} at ${selectedTimeSlot}
Location: ${siteConfig.address}`;

    navigator.clipboard?.writeText(details);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-sm border border-[#2b2e3a] bg-[#121318] text-[#e2e4ea] shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#21232d] bg-[#15171f] px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xs bg-[#c99b4d]/10 text-[#d6b374]">
              <Scissors className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-[#f5f6f8]">
                Reserve Your Chair
              </h3>
              <p className="text-[11px] text-[#868b98]">
                {siteConfig.shopName} · Step {step} of 4
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xs p-1 text-[#868b98] hover:bg-[#20222a] hover:text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        {step < 5 && (
          <div className="grid grid-cols-4 border-b border-[#1f2129] bg-[#0f1014] text-[11px] font-medium text-center">
            <button
              onClick={() => setStep(1)}
              className={`py-2 border-b-2 cursor-pointer transition-colors ${
                step === 1 ? 'border-[#c99b4d] text-[#e4cfa3]' : 'border-transparent text-[#6b707e]'
              }`}
            >
              1. Service
            </button>
            <button
              onClick={() => setStep(2)}
              className={`py-2 border-b-2 cursor-pointer transition-colors ${
                step === 2 ? 'border-[#c99b4d] text-[#e4cfa3]' : 'border-transparent text-[#6b707e]'
              }`}
            >
              2. Barber
            </button>
            <button
              onClick={() => setStep(3)}
              className={`py-2 border-b-2 cursor-pointer transition-colors ${
                step === 3 ? 'border-[#c99b4d] text-[#e4cfa3]' : 'border-transparent text-[#6b707e]'
              }`}
            >
              3. Time
            </button>
            <button
              onClick={() => setStep(4)}
              className={`py-2 border-b-2 cursor-pointer transition-colors ${
                step === 4 ? 'border-[#c99b4d] text-[#e4cfa3]' : 'border-transparent text-[#6b707e]'
              }`}
            >
              4. Details
            </button>
          </div>
        )}

        {/* Step Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: SERVICE */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-wider text-[#c99b4d] font-semibold">
                Select Your Desired Craft
              </div>
              <div className="space-y-2">
                {servicesData.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedService(s)}
                    className={`flex items-center justify-between p-3.5 rounded-sm border cursor-pointer transition-all ${
                      selectedService.id === s.id
                        ? 'border-[#c99b4d] bg-[#1a1c24]'
                        : 'border-[#22252f] bg-[#14151b] hover:border-[#383d4c]'
                    }`}
                  >
                    <div>
                      <div className="font-serif text-sm font-medium text-[#f4f5f8]">{s.name}</div>
                      <div className="text-[11px] text-[#868b98] flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-[#c99b4d]" />
                          {s.durationMinutes} mins
                        </span>
                        <span>·</span>
                        <span className="capitalize">{s.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-base font-semibold text-[#e4cfa3] tabular-nums">
                        ${s.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 rounded-sm bg-[#c99b4d] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0e0f12] hover:bg-[#d6b374] cursor-pointer"
                >
                  <span>Select Barber</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: BARBER */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-wider text-[#c99b4d] font-semibold">
                Choose Your Craftsman
              </div>

              {/* Any barber option */}
              <div
                onClick={() => setSelectedBarberId('any')}
                className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                  selectedBarberId === 'any'
                    ? 'border-[#c99b4d] bg-[#1a1c24]'
                    : 'border-[#22252f] bg-[#14151b] hover:border-[#383d4c]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-serif text-sm font-medium text-[#f4f5f8]">
                      First Available Master Barber
                    </div>
                    <div className="text-xs text-[#8c919e]">
                      Fastest booking · Every barber is verified master class
                    </div>
                  </div>
                  <User className="h-4 w-4 text-[#c99b4d]" />
                </div>
              </div>

              {/* Specific barbers */}
              <div className="space-y-2">
                {barbersData.map((barber) => (
                  <div
                    key={barber.id}
                    onClick={() => setSelectedBarberId(barber.id)}
                    className={`flex items-center justify-between p-3.5 rounded-sm border cursor-pointer transition-all ${
                      selectedBarberId === barber.id
                        ? 'border-[#c99b4d] bg-[#1a1c24]'
                        : 'border-[#22252f] bg-[#14151b] hover:border-[#383d4c]'
                    }`}
                  >
                    <div>
                      <div className="font-serif text-sm font-medium text-[#f4f5f8]">
                        {barber.name} <span className="text-[#c99b4d]">("{barber.nickname}")</span>
                      </div>
                      <div className="text-[11px] text-[#868b98] mt-0.5">
                        {barber.role} · {barber.experienceYears} Years Exp
                      </div>
                      <div className="text-[11px] text-[#6d7280]">{barber.specialty}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-xs text-[#9095a3] hover:text-white cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 rounded-sm bg-[#c99b4d] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0e0f12] hover:bg-[#d6b374] cursor-pointer"
                >
                  <span>Select Date & Time</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="text-xs uppercase tracking-wider text-[#c99b4d] font-semibold">
                Select Date & Chair Slot
              </div>

              {/* Date horizontal pills */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {availableDates.map((item) => (
                  <button
                    key={item.dateString}
                    onClick={() => setSelectedDate(item.dateString)}
                    className={`flex flex-col items-center py-2.5 px-1 rounded-sm border cursor-pointer transition-all ${
                      selectedDate === item.dateString
                        ? 'border-[#c99b4d] bg-[#c99b4d] text-[#0e0f12]'
                        : 'border-[#242732] bg-[#15171f] text-[#9397a6] hover:text-white hover:border-[#3d4252]'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-medium">{item.dayName}</span>
                    <span className="text-base font-semibold font-serif">{item.dayNumber}</span>
                    <span className="text-[9px] uppercase">{item.monthName}</span>
                  </button>
                ))}
              </div>

              {/* Time Slots */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#797e8c] mb-2 font-medium">
                    Morning
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {morningSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 text-xs font-medium rounded-xs border cursor-pointer transition-all ${
                          selectedTimeSlot === slot
                            ? 'border-[#c99b4d] bg-[#1f222d] text-[#e4cfa3] font-semibold'
                            : 'border-[#242732] bg-[#14151b] text-[#9da2b0] hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#797e8c] mb-2 font-medium">
                    Afternoon
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {afternoonSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 text-xs font-medium rounded-xs border cursor-pointer transition-all ${
                          selectedTimeSlot === slot
                            ? 'border-[#c99b4d] bg-[#1f222d] text-[#e4cfa3] font-semibold'
                            : 'border-[#242732] bg-[#14151b] text-[#9da2b0] hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#797e8c] mb-2 font-medium">
                    Evening
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {eveningSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 text-xs font-medium rounded-xs border cursor-pointer transition-all ${
                          selectedTimeSlot === slot
                            ? 'border-[#c99b4d] bg-[#1f222d] text-[#e4cfa3] font-semibold'
                            : 'border-[#242732] bg-[#14151b] text-[#9da2b0] hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 text-xs text-[#9095a3] hover:text-white cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex items-center gap-2 rounded-sm bg-[#c99b4d] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0e0f12] hover:bg-[#d6b374] cursor-pointer"
                >
                  <span>Enter Contact Info</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT & DETAILS */}
          {step === 4 && (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="text-xs uppercase tracking-wider text-[#c99b4d] font-semibold">
                Client Information
              </div>

              {/* Summary pill */}
              <div className="rounded-xs bg-[#161821] border border-[#262834] p-3 text-xs text-[#b0b4c2] flex flex-wrap justify-between gap-2">
                <div>
                  <span className="text-[#7d8290]">Booking: </span>
                  <span className="font-semibold text-white">{selectedService.name}</span>
                </div>
                <div>
                  <span className="text-[#7d8290]">Barber: </span>
                  <span className="font-medium text-[#e4cfa3]">{getBarberName()}</span>
                </div>
                <div>
                  <span className="text-[#7d8290]">Slot: </span>
                  <span className="font-medium text-white">{selectedDate} @ {selectedTimeSlot}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-[#9498a5] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Thomas Wayne"
                    className="w-full rounded-sm border border-[#2b2e3a] bg-[#161820] py-2 px-3 text-xs text-[#e4e7ee] focus:border-[#c99b4d] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#9498a5] mb-1">Phone Number (SMS confirmation) *</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-sm border border-[#2b2e3a] bg-[#161820] py-2 px-3 text-xs text-[#e4e7ee] focus:border-[#c99b4d] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#9498a5] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="thomas@example.com"
                      className="w-full rounded-sm border border-[#2b2e3a] bg-[#161820] py-2 px-3 text-xs text-[#e4e7ee] focus:border-[#c99b4d] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#9498a5] mb-1">Special Notes / Hair Growth Notes (Optional)</label>
                  <textarea
                    rows={2}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="e.g. High cowlick on crown, growing out beard for wedding..."
                    className="w-full rounded-sm border border-[#2b2e3a] bg-[#161820] py-2 px-3 text-xs text-[#e4e7ee] focus:border-[#c99b4d] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1 text-xs text-[#9095a3] hover:text-white cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-sm bg-[#c99b4d] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0e0f12] hover:bg-[#d6b374] cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Confirm Reservation</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: CONFIRMATION RECEIPT */}
          {step === 5 && (
            <div className="text-center py-4 space-y-6">
              <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-normal text-white">Chair Confirmed</h3>
                <p className="text-xs text-[#9297a5]">
                  We look forward to welcoming you to {siteConfig.shopName}.
                </p>
              </div>

              <div className="rounded-sm border border-[#262834] bg-[#151720] p-5 text-left max-w-md mx-auto space-y-3">
                <div className="flex justify-between items-center border-b border-[#21232d] pb-2 text-xs">
                  <span className="text-[#7d8290]">Booking Reference:</span>
                  <span className="font-mono font-bold text-[#e4cfa3]">{bookingCode}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7d8290]">Client:</span>
                  <span className="font-medium text-white">{clientName}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7d8290]">Service:</span>
                  <span className="font-medium text-white">{selectedService.name} (${selectedService.price})</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7d8290]">Master Barber:</span>
                  <span className="font-medium text-[#e4cfa3]">{getBarberName()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7d8290]">Date & Time:</span>
                  <span className="font-medium text-white">{selectedDate} at {selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-[#21232d] pt-2">
                  <span className="text-[#7d8290]">Address:</span>
                  <span className="text-[#a4a9b7] text-right truncate max-w-[200px]">{siteConfig.address}</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleDownloadCalendar}
                  className="flex items-center gap-1.5 rounded-sm border border-[#343844] bg-[#1a1c24] px-4 py-2 text-xs font-semibold text-[#d4d7e2] hover:bg-[#252834] cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Save to Calendar (.ics)</span>
                </button>

                <button
                  onClick={handleCopyBookingDetails}
                  className="flex items-center gap-1.5 rounded-sm border border-[#343844] bg-[#1a1c24] px-4 py-2 text-xs font-semibold text-[#d4d7e2] hover:bg-[#252834] cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Details</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setStep(1);
                    onClose();
                  }}
                  className="rounded-sm bg-[#c99b4d] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0e0f12] hover:bg-[#d6b374] cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
