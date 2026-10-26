'use client';

type ScanBadgeVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'muted' | 'error';

interface ScanBadgeProps {
  children: React.ReactNode;
  variant?: ScanBadgeVariant;
  className?: string;
  bordered?: boolean;
}

const variantStyles: Record<ScanBadgeVariant, string> = {
  primary: 'text-primary border-primary/30',
  secondary: 'text-secondary border-secondary/30',
  tertiary: 'text-tertiary-dim border-tertiary-dim/30',
  outline: 'text-outline border-outline/30',
  muted: 'text-outline border-outline-variant/40',
  error: 'text-error border-error/30',
};

export default function ScanBadge({
  children,
  variant = 'primary',
  className = '',
  bordered = true,
}: ScanBadgeProps) {
  return (
    <span
      className={`inline-block font-mono text-[11px] tracking-[0.15em] uppercase px-2 py-1 ${bordered ? 'border' : ''} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
