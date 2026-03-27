'use client';

interface Option { value: string; label: string }

interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Option[]
  hint?: string
}

export default function AdminSelect({ label, options, hint, className = '', ...props }: AdminSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] text-outline tracking-widest uppercase">
        {label}
        {props.required && <span className="text-primary ml-1">*</span>}
      </label>
      <select
        {...props}
        className={`bg-surface-container-high border border-outline-variant/30 focus:border-primary/60 outline-none text-on-surface font-body text-sm px-3 py-2.5 transition-colors duration-200 ${className}`}
      >
        <option value="">— Select —</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {hint && <p className="font-mono text-[9px] text-outline/60 tracking-wide">{hint}</p>}
    </div>
  )
}
