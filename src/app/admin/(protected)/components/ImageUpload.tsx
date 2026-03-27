'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  label: string
  value: string
  onChange: (url: string) => void
  folder: string
  hint?: string
}

export default function ImageUpload({ label, value, onChange, folder, hint }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    const data = await res.json();

    if (!res.ok) {
      setUploadError(data.error ?? 'Upload failed');
    } else {
      onChange(data.url);
    }

    setUploading(false);
    // Reset input so same file can be re-selected
    if (inputRef.current) inputRef.current.value = '';
  }

  const isSupabaseUrl = value.startsWith('http');
  const previewSrc = isSupabaseUrl ? value : value || null;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] text-outline tracking-widest uppercase">
        {label}
      </label>

      <div className="flex gap-3 items-start">
        {/* Preview */}
        <div className="w-20 h-20 bg-surface-container border border-outline-variant/20 flex-shrink-0 flex items-center justify-center overflow-hidden relative">
          {previewSrc ? (
            <Image
              src={previewSrc}
              alt="preview"
              fill
              className="object-contain p-1"
              unoptimized={isSupabaseUrl}
            />
          ) : (
            <span className="font-mono text-[9px] text-outline/40 tracking-widest">NO IMG</span>
          )}
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Current URL (editable manually too) */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/products/myimage.png or upload →"
            className="bg-surface-container-high border border-outline-variant/30 focus:border-primary/60 outline-none text-on-surface font-body text-sm px-3 py-2 placeholder:text-outline/40 transition-colors duration-200 w-full"
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="font-mono text-[9px] uppercase tracking-widest px-4 py-1.5 border border-secondary/40 text-secondary hover:bg-secondary/10 disabled:opacity-40 transition-colors duration-200"
            >
              {uploading ? 'UPLOADING...' : '↑ UPLOAD FILE'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="font-mono text-[9px] uppercase tracking-widest text-outline/50 hover:text-error transition-colors duration-200"
              >
                CLEAR
              </button>
            )}
          </div>

          {uploadError && (
            <p className="font-mono text-[9px] text-error tracking-widest">{uploadError}</p>
          )}
        </div>
      </div>

      {hint && <p className="font-mono text-[9px] text-outline/60 tracking-wide">{hint}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}
