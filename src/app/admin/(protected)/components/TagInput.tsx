'use client';

import { useState, KeyboardEvent } from 'react';

interface TagInputProps {
  label: string
  value: string[]
  onChange: (tags: string[]) => void
  hint?: string
  placeholder?: string
}

export default function TagInput({ label, value, onChange, hint, placeholder = 'Type and press Enter' }: TagInputProps) {
  const [input, setInput] = useState('');

  function addTag() {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput('');
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] text-outline tracking-widest uppercase">{label}</label>
      <div className="bg-surface-container-high border border-outline-variant/30 focus-within:border-primary/60 px-3 py-2 flex flex-wrap gap-1.5 min-h-[42px] transition-colors duration-200">
        {value.map((tag) => (
          <span key={tag} className="flex items-center gap-1 bg-primary/10 border border-primary/20 px-2 py-0.5">
            <span className="font-mono text-[10px] text-primary tracking-widest uppercase">{tag}</span>
            <button type="button" onClick={() => removeTag(tag)} className="text-primary/60 hover:text-primary leading-none">×</button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={addTag}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-on-surface font-body text-sm placeholder:text-outline/40"
        />
      </div>
      {hint && <p className="font-mono text-[9px] text-outline/60 tracking-wide">{hint}</p>}
    </div>
  );
}
