/**
 * Environment configuration for Crown & Blade Barber Co.
 * Uses Vite's import.meta.env with fallback defaults.
 */
export const siteConfig = {
  shopName: import.meta.env.VITE_SHOP_NAME || 'Crown & Blade Barber Co.',
  phone: import.meta.env.VITE_SHOP_PHONE || '+1 (555) 382-7294',
  address: import.meta.env.VITE_SHOP_ADDRESS || '142 River Street, Suite 4, Mill Quarter',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://crown-and-blade-barber.vercel.app',
  bookingNotice:
    import.meta.env.VITE_BOOKING_NOTICE ||
    'Walk-ins welcome based on chair availability; appointments guaranteed.',
  hours: [
    { day: 'Monday', hours: '9:00 AM - 7:00 PM', open: 9, close: 19 },
    { day: 'Tuesday', hours: '9:00 AM - 7:00 PM', open: 9, close: 19 },
    { day: 'Wednesday', hours: '9:00 AM - 7:00 PM', open: 9, close: 19 },
    { day: 'Thursday', hours: '9:00 AM - 8:00 PM', open: 9, close: 20 },
    { day: 'Friday', hours: '9:00 AM - 8:00 PM', open: 9, close: 20 },
    { day: 'Saturday', hours: '8:30 AM - 6:00 PM', open: 8.5, close: 18 },
    { day: 'Sunday', hours: '10:00 AM - 4:00 PM', open: 10, close: 16 },
  ],
};
