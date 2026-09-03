import { notFound } from 'next/navigation';
import { courses, getCourse } from '@/lib/courses';
import CourseClient from './CourseClient';

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = getCourse(params.slug);
  if (!course) notFound();
  return <CourseClient course={course} />;
}
