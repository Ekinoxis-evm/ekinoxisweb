import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { courses, getCourse } from '@/lib/courses';
import { langOf } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import CourseClient from './CourseClient';

type Props = { params: { lang: string; slug: string } };

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const course = getCourse(params.slug);
  if (!course) return {};
  return pageMetadata(langOf(params), `/courses/${course.slug}`, { title: course.title, description: course.tagline });
}

export default function CoursePage({ params }: Props) {
  const course = getCourse(params.slug);
  if (!course) notFound();
  return <CourseClient course={course} />;
}
