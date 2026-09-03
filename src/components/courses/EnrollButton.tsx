'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '@/components/ui/Button';
import { COURSES_ENROLL_FALLBACK, type Course } from '@/lib/courses';

interface Props {
  course: Course;
  label: string;
  className?: string;
  variant?: 'primary' | 'ghost';
}

/**
 * Open courses go to Stripe Checkout; waitlist / coming-soon go to the
 * enrollUrl (or Telegram). Same visual either way.
 */
export default function EnrollButton({ course, label, className = '', variant = 'primary' }: Props) {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const buyable = course.status === 'open' && !!course.stripePriceEnv;

  if (!buyable) {
    return (
      <a href={course.enrollUrl ?? COURSES_ENROLL_FALLBACK} target="_blank" rel="noopener noreferrer" className={className}>
        <Button variant={variant} className="w-full justify-center">{label}</Button>
      </a>
    );
  }

  const checkout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: course.slug, language }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Checkout unavailable');
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout unavailable');
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <Button variant={variant} className="w-full justify-center" onClick={checkout} disabled={loading}>
        {loading ? (language === 'en' ? 'Opening checkout…' : 'Abriendo pago…') : label}
      </Button>
      {error && (
        <p className="font-mono text-[10px] text-error uppercase tracking-widest mt-2">{error}</p>
      )}
    </div>
  );
}
