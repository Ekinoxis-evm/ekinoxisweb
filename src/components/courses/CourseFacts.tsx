'use client';

import { CalendarDays, CalendarRange, GraduationCap, Hourglass, Languages, Video, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { CourseFactKind, Course } from '@/lib/courses';
import FactList from '@/components/ui/FactList';

const ICONS: Record<CourseFactKind, LucideIcon> = {
  date: CalendarDays,
  duration: Hourglass,
  sessions: CalendarRange,
  format: Video,
  language: Languages,
};

/** Date, duration, format, language and level of a workshop: one icon row each. */
export default function CourseFacts({ course, level, className }: { course: Pick<Course, 'facts'>; level: string; className?: string }) {
  const { language } = useLanguage();
  const facts = [
    ...course.facts[language].map(({ kind, text }) => ({ icon: ICONS[kind], text })),
    { icon: GraduationCap, text: level },
  ];
  return <FactList facts={facts} className={className} />;
}
