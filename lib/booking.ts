// Booking time windows for the gym lead form.
//
// The day runs 7 AM – 7 PM Mountain in four three-hour windows. A window is
// offered only while it is still ahead: on the current day it closes
// MIN_LEAD_MINUTES before it starts, so nobody can book a window that is
// already running. The form re-checks on submit and the API checks again,
// because a tab can sit open for hours and its own view of "now" goes stale.

export const BUSINESS_TZ = 'America/Denver';

export interface TimeSlotDef {
  label: string;
  /** minutes from midnight in BUSINESS_TZ */
  startMinutes: number;
  endMinutes: number;
}

export const TIME_SLOT_DEFS: readonly TimeSlotDef[] = [
  { label: '7 AM – 10 AM', startMinutes: 7 * 60, endMinutes: 10 * 60 },
  { label: '10 AM – 1 PM', startMinutes: 10 * 60, endMinutes: 13 * 60 },
  { label: '1 PM – 4 PM', startMinutes: 13 * 60, endMinutes: 16 * 60 },
  { label: '4 PM – 7 PM', startMinutes: 16 * 60, endMinutes: 19 * 60 },
] as const;

export const TIME_SLOTS: readonly string[] = TIME_SLOT_DEFS.map((slot) => slot.label);

/** How long before a window starts online booking for it closes. */
export const MIN_LEAD_MINUTES = 60;

export interface BusinessNow {
  /** YYYY-MM-DD in BUSINESS_TZ */
  date: string;
  /** minutes from midnight in BUSINESS_TZ */
  minutes: number;
}

/**
 * Current date and time in the shop's timezone. The server runs in UTC and a
 * customer's browser can be in any timezone, so both sides ask for Mountain
 * explicitly and get the same answer.
 */
export function businessNow(now: Date = new Date()): BusinessNow {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: BUSINESS_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '00';
  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

export const isValidDateISO = (dateISO: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(dateISO);

/** Gym is open Monday–Saturday. Built in UTC so the weekday never shifts. */
export const isSundayISO = (dateISO: string): boolean => {
  const [y, m, d] = dateISO.split('-').map(Number);
  if (!y || !m || !d) return false;
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay() === 0;
};

export const addDaysISO = (dateISO: string, days: number): string => {
  const [y, m, d] = dateISO.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
};

/** Can this window still be booked on this date? */
export function isSlotOpen(
  dateISO: string,
  slotLabel: string,
  now: BusinessNow = businessNow()
): boolean {
  const slot = TIME_SLOT_DEFS.find((def) => def.label === slotLabel);
  if (!slot) return false;
  if (!isValidDateISO(dateISO) || isSundayISO(dateISO)) return false;
  if (dateISO < now.date) return false;
  if (dateISO > now.date) return true;
  return slot.startMinutes - MIN_LEAD_MINUTES >= now.minutes;
}

export const hasOpenSlots = (dateISO: string, now: BusinessNow = businessNow()): boolean =>
  TIME_SLOT_DEFS.some((slot) => isSlotOpen(dateISO, slot.label, now));

/**
 * Earliest date still worth offering: today while a window is open, otherwise
 * the next open day. Used as the `min` of the date picker.
 */
export function firstBookableDate(now: BusinessNow = businessNow()): string {
  let date = now.date;
  for (let i = 0; i < 14; i += 1) {
    if (hasOpenSlots(date, now)) return date;
    date = addDaysISO(date, 1);
  }
  return date;
}
