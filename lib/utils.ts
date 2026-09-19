import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => capitalize(word))
    .join(' ');
}

export const PHONE_NUMBER = '+17207066650';
export const PHONE_DISPLAY = '(720) 706-6650';
export const BUSINESS_EMAIL = 'help@h-prime-co.com';
export const BUSINESS_NAME = 'H-Prime Gym Equipment Repair';
export const BUSINESS_ADDRESS = 'Denver, CO';
// Live GBP values (checked 2026-07-10, place_id ChIJ-9PIIigRJy0Rt-5gcmeOzAo, profile "H-Prime Fitness Equipment Repair")
export const GOOGLE_RATING = 5.0;
export const GOOGLE_REVIEW_COUNT = '9';
export const GOOGLE_BUSINESS_PROFILE_URL = 'https://search.google.com/local/reviews?placeid=ChIJ-9PIIigRJy0Rt-5gcmeOzAo';
export const SERVICE_CALL_FEE = '$99';

// Professional icons (Lucide React style)
export const icons = {
  phone: '📞',
  calendar: '📅',
  checkCircle: '✓',
  star: '⭐',
  clock: '⏱️',
  shield: '🛡️',
  award: '🏆',
  wrench: '🔧',
};

