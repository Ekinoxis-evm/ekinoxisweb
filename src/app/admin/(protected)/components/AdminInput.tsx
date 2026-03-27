'use client';

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
}

export default function AdminInput({ label, hint, className = '', ...props }: AdminInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] text-outline tracking-widest uppercase">
        {label}
        {props.required && <span className="text-primary ml-1">*</span>}
      </label>
      <input
        {...props}
        className={`bg-surface-container-high border border-outline-variant/30 focus:border-primary/60 outline-none text-on-surface font-body text-sm px-3 py-2.5 placeholder:text-outline/40 transition-colors duration-200 ${className}`}
      />
      {hint && <p className="font-mono text-[9px] text-outline/60 tracking-wide">{hint}</p>}
    </div>
  )
}
