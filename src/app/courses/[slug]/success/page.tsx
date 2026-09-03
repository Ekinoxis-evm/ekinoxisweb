import { notFound } from 'next/navigation';
import { getCourse } from '@/lib/courses';
import SuccessClient from './SuccessClient';

export const dynamic = 'force-dynamic';

export default function CourseSuccessPage({ params }: { params: { slug: string } }) {
  const course = getCourse(params.slug);
  if (!course) notFound();
  return <SuccessClient course={course} />;
}
