'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PatternFormat } from 'react-number-format';
import { BusinessNow, TIME_SLOT_DEFS, businessNow, firstBookableDate, isSlotOpen, isSundayISO } from '@/lib/booking';

// Temporary holiday closure — Independence Day weekend 2026 (Fri Jul 3 – Sun Jul 5).
// Self-expiring: once these dates are in the past, `min={today}` on the date input already
// prevents selecting them, so the refine below becomes a no-op. Safe to leave; remove anytime.
const BLOCKED_DATES = ['2026-07-03', '2026-07-04', '2026-07-05'];

// Gym is closed on Sundays (open Mon–Sat). A native <input type="date"> can't grey out
// weekdays, so we reject Sundays in validation and show a hint. Dates are judged in the
// shop's timezone (lib/booking), not the browser's.
const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .refine((val) => val.replace(/\D/g, '').length === 10, 'Please enter a complete 10-digit phone number'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(5, 'Please describe the issue (minimum 5 characters)'),
  street: z.string().min(3, 'Street address is required'),
  apartment: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().min(5, 'Please enter a valid 5-digit ZIP code'),
  preferredDate: z
    .string()
    .min(1, 'Please select a preferred date')
    .refine((val) => !BLOCKED_DATES.includes(val), {
      message: 'We are closed Jul 3–5 for the holiday. Please choose another date.',
    })
    .refine((val) => !isSundayISO(val), {
      message: "We're closed on Sundays — please choose Monday through Saturday.",
    })
    .refine((val) => val >= businessNow().date, {
      message: 'Please choose today or a later date.',
    }),
  preferredTimeSlot: z.string().min(1, 'Please select a time slot'),
}).superRefine((data, ctx) => {
  // Checked against the clock at submit time, so a tab left open since the morning
  // can't send a window that has already started.
  if (data.preferredDate && data.preferredTimeSlot && !isSlotOpen(data.preferredDate, data.preferredTimeSlot)) {
    ctx.addIssue({
      code: 'custom',
      path: ['preferredTimeSlot'],
      message: 'This window has already started — please pick a later one.',
    });
  }
});

type FormData = z.infer<typeof formSchema>;

const STEP_1_FIELDS: Array<keyof FormData> = ['firstName', 'lastName', 'phone', 'email', 'message'];

interface LeadFormProps {
  variant?: 'section' | 'modal';
  onSuccess?: () => void;
}

export default function LeadForm({ variant = 'section', onSuccess }: LeadFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'slot_closed'>('idle');
  // Shop-time clock, set after mount (no hydration mismatch) and refreshed every minute
  // and whenever the tab comes back into focus.
  const [now, setNow] = useState<BusinessNow | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    trigger,
    watch,
    getValues,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    const tick = () => setNow(businessNow());
    tick();
    const id = window.setInterval(tick, 60_000);
    const onVisible = () => {
      if (document.visibilityState === 'visible') tick();
    };
    window.addEventListener('focus', tick);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearInterval(id);
      window.removeEventListener('focus', tick);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const selectedDate = watch('preferredDate');
  const minDate = now ? firstBookableDate(now) : undefined;
  const slotOpen = (label: string) => !now || !selectedDate || isSlotOpen(selectedDate, label, now);

  // A window that closed while the form sat open is dropped from the selection, and the
  // customer is told to pick another one.
  useEffect(() => {
    if (!now) return;
    const { preferredDate: date, preferredTimeSlot: slot } = getValues();
    if (date && slot && !isSlotOpen(date, slot, now)) {
      setValue('preferredTimeSlot', '', { shouldValidate: false });
      setSubmitStatus('slot_closed');
    }
  }, [now, selectedDate, getValues, setValue]);

  const selectedSlot = watch('preferredTimeSlot');
  useEffect(() => {
    if (selectedSlot) setSubmitStatus((s) => (s === 'slot_closed' ? 'idle' : s));
  }, [selectedSlot]);

  const goToStep2 = async () => {
    const valid = await trigger(STEP_1_FIELDS);
    if (valid) setStep(2);
  };

  const goToStep1 = () => setStep(1);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const cleanedPhone = data.phone.replace(/\D/g, '');
      const cleanText = (text: string) =>
        text.replace(/["']/g, '').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

      let attribution: Record<string, string> = {};
      try {
        const stored = sessionStorage.getItem('hprime_attribution');
        if (stored) attribution = JSON.parse(stored);
      } catch {
        // sessionStorage unavailable, skip
      }

      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: cleanedPhone,
          email: data.email,
          street: cleanText(data.street),
          apartment: cleanText(data.apartment || ''),
          city: cleanText(data.city),
          zipCode: data.zipCode,
          equipment: cleanText(data.message),
          preferredDate: data.preferredDate,
          preferredTimeSlot: data.preferredTimeSlot,
          attribution,
          submission_page: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '',
        }),
      });

      if (response.ok) {
        if (typeof window !== 'undefined' && (window as { dataLayer?: Record<string, unknown>[] }).dataLayer) {
          (window as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
            event: 'lead_submitted',
            enhanced_conversions: {
              email: data.email,
              phone_number: `+1${cleanedPhone}`,
              first_name: data.firstName,
              last_name: data.lastName,
              street: data.street,
              city: data.city,
              region: 'CO',
              postal_code: data.zipCode,
              country: 'US',
            },
          });
        }
        setSubmitStatus('success');
        reset();
        if (onSuccess) onSuccess();
        const tyParams = new URLSearchParams({
          date: data.preferredDate,
          time: data.preferredTimeSlot,
        });
        router.push(`/thank-you-page?${tyParams.toString()}`);
      } else if (response.status === 409) {
        setValue('preferredTimeSlot', '', { shouldValidate: false });
        setSubmitStatus('slot_closed');
        setNow(businessNow());
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    'w-full px-3 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const labelCls = 'block text-sm font-semibold text-gray-700 mb-1';
  const errorCls = 'text-red-600 text-xs mt-0.5';

  const stepIndicator = (
    <div className="flex items-center justify-center gap-2 mb-4" aria-label={`Step ${step} of 2`}>
      <div
        className={`h-2 w-12 rounded-full transition-colors ${step === 1 ? 'bg-[#1B2A4A]' : 'bg-gray-300'}`}
        aria-hidden="true"
      />
      <div
        className={`h-2 w-12 rounded-full transition-colors ${step === 2 ? 'bg-[#1B2A4A]' : 'bg-gray-300'}`}
        aria-hidden="true"
      />
      <span className="ml-2 text-xs text-gray-500">{step}/2</span>
    </div>
  );

  const step1 = (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="firstName" className={labelCls}>First name *</label>
          <input {...register('firstName')} type="text" id="firstName" className={inputCls} placeholder="John" autoComplete="given-name" />
          {errors.firstName && <p className={errorCls}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className={labelCls}>Last name *</label>
          <input {...register('lastName')} type="text" id="lastName" className={inputCls} placeholder="Smith" autoComplete="family-name" />
          {errors.lastName && <p className={errorCls}>{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelCls}>Phone *</label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PatternFormat
              {...field}
              format="(###) ###-####"
              mask="_"
              placeholder="(720) 555-0123"
              className={inputCls}
              type="tel"
              autoComplete="tel"
            />
          )}
        />
        {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>E-mail *</label>
        <input {...register('email')} type="email" id="email" className={inputCls} placeholder="john@example.com" autoComplete="email" inputMode="email" />
        {errors.email && <p className={errorCls}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>What gym equipment needs repair? *</label>
        <textarea
          {...register('message')}
          id="message"
          rows={3}
          className={inputCls}
          placeholder="My Peloton treadmill won't turn on, error E01"
        />
        {errors.message && <p className={errorCls}>{errors.message.message}</p>}
      </div>

      <button
        type="button"
        onClick={goToStep2}
        className="w-full text-white py-3 rounded-lg transition font-semibold text-base shadow-lg hover:shadow-xl"
        style={{ backgroundColor: '#1B2A4A' }}
      >
        Continue →
      </button>
    </div>
  );

  const step2 = (
    <div className="space-y-3">
      <div>
        <label htmlFor="street" className={labelCls}>Street address *</label>
        <input {...register('street')} type="text" id="street" className={inputCls} placeholder="123 Main Street" autoComplete="address-line1" />
        {errors.street && <p className={errorCls}>{errors.street.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="apartment" className={labelCls}>Unit / Apt</label>
          <input {...register('apartment')} type="text" id="apartment" className={inputCls} placeholder="Apt 4B" autoComplete="address-line2" />
        </div>
        <div>
          <label htmlFor="city" className={labelCls}>City *</label>
          <input {...register('city')} type="text" id="city" className={inputCls} placeholder="Denver" autoComplete="address-level2" />
          {errors.city && <p className={errorCls}>{errors.city.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="zipCode" className={labelCls}>ZIP code *</label>
        <Controller
          name="zipCode"
          control={control}
          render={({ field }) => (
            <PatternFormat
              {...field}
              format="#####"
              mask="_"
              placeholder="80202"
              className={inputCls}
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
            />
          )}
        />
        {errors.zipCode && <p className={errorCls}>{errors.zipCode.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="preferredDate" className={labelCls}>Preferred date *</label>
          <input
            {...register('preferredDate')}
            type="date"
            id="preferredDate"
            min={minDate}
            className={inputCls}
          />
          <p className="text-gray-500 text-xs mt-0.5">Closed Sundays.</p>
          {now && BLOCKED_DATES.some((d) => d >= now.date) && (
            <p className="text-amber-600 text-xs mt-0.5">Closed Jul 3–5 for the holiday — please pick another date.</p>
          )}
          {errors.preferredDate && <p className={errorCls}>{errors.preferredDate.message}</p>}
        </div>
        <div>
          <label htmlFor="preferredTimeSlot" className={labelCls}>Time slot *</label>
          <select
            {...register('preferredTimeSlot')}
            id="preferredTimeSlot"
            className={inputCls}
            defaultValue=""
          >
            <option value="" disabled>Select…</option>
            {TIME_SLOT_DEFS.map(({ label }) => {
              const open = slotOpen(label);
              return (
                <option key={label} value={label} disabled={!open}>
                  {label}{open ? '' : ' — too late today'}
                </option>
              );
            })}
          </select>
          {errors.preferredTimeSlot && <p className={errorCls}>{errors.preferredTimeSlot.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-1">
        <button
          type="button"
          onClick={goToStep1}
          className="col-span-1 py-3 rounded-lg font-semibold text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="col-span-2 text-white py-3 rounded-lg transition font-semibold text-base shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#1B2A4A' }}
        >
          {isSubmitting ? 'Submitting…' : 'Request Service'}
        </button>
      </div>

      {submitStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
          Something went wrong. Please try again or call us directly.
        </div>
      )}

      {submitStatus === 'slot_closed' && (
        <div className="bg-amber-100 border border-amber-400 text-amber-800 px-3 py-2 rounded text-sm">
          That window has already started. Please pick a later one — or call us and we will find the
          fastest slot.
        </div>
      )}
    </div>
  );

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {stepIndicator}
      {step === 1 ? step1 : step2}
    </form>
  );

  if (variant === 'modal') {
    return formContent;
  }

  return (
    <section id="lead-form" className="py-12 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {step === 1 ? 'Request Service Today' : 'When should we come?'}
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              {step === 1
                ? "We'll call you back within 15 minutes"
                : 'Choose your address & preferred time'}
            </p>
          </div>
          {formContent}
        </div>
      </div>
    </section>
  );
}
