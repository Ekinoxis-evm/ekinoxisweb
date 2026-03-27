'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import AdminInput from '../components/AdminInput';
import ImageUpload from '../components/ImageUpload';
import type { Hackathon } from '@/lib/supabase/types';

interface HackathonFormProps { hackathon?: Hackathon }

export default function HackathonForm({ hackathon }: HackathonFormProps) {
  const router = useRouter();
  const isEdit = !!hackathon;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState(hackathon?.name ?? '');
  const [logoUrl, setLogoUrl] = useState(hackathon?.logo_url ?? '');
  const [website, setWebsite] = useState(hackathon?.website ?? '');
  const [startDate, setStartDate] = useState(hackathon?.start_date ?? '');
  const [endDate, setEndDate] = useState(hackathon?.end_date ?? '');
  const [displayOrder, setDisplayOrder] = useState(hackathon?.display_order ?? 0);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setError('');

    const payload = {
      name, logo_url: logoUrl,
      website: website || null,
      start_date: startDate || null,
      end_date: endDate || null,
      display_order: displayOrder,
    };

    try {
      const url = isEdit ? `/api/admin/hackathons/${hackathon.id}` : '/api/admin/hackathons';
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = `Save failed (${res.status})`;
        try { const d = await res.json(); msg = d.error ?? msg; } catch {}
        setError(msg);
        setSaving(false); return;
      }
      router.push('/admin/hackathons'); router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!isEdit || !confirm('Delete this hackathon?')) return;
    const res = await fetch(`/api/admin/hackathons/${hackathon.id}`, { method: 'DELETE' });
    if (res.ok) { router.push('/admin/hackathons'); router.refresh(); }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <div className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-8">
        <span className="border border-primary/30 px-2 py-1">EKX_ADMIN</span>
        <span className="text-outline">/</span>
        <a href="/admin/hackathons" className="border border-primary/30 px-2 py-1 hover:border-primary/60">HACKATHONS</a>
        <span className="text-outline">/</span>
        <span className="border border-primary/30 px-2 py-1">{isEdit ? 'EDIT' : 'NEW'}</span>
      </div>

      <h1 className="font-headline text-5xl font-bold tracking-tighter leading-[0.9] uppercase text-on-surface mb-10">
        {isEdit ? 'EDIT' : 'NEW'} <span className="text-primary">HACKATHON</span>
      </h1>

      {error && (
        <div className="mb-6 border border-error/40 bg-error/5 px-4 py-3">
          <p className="font-mono text-[10px] text-error tracking-widest uppercase">{error}</p>
        </div>
      )}

      <div className="bg-surface-container-low border border-outline-variant/20 p-8 mb-4">
        <p className="font-mono text-[10px] text-outline tracking-widest uppercase mb-6">DETAILS</p>
        <div className="grid grid-cols-1 gap-5">
          <AdminInput label="Name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="ETHGlobal Superhack 2024" />
          <ImageUpload label="Logo *" value={logoUrl} onChange={setLogoUrl} folder="hackathons" hint="Upload new or keep existing /hackathons/ path" />
          <AdminInput label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://ethglobal.com/events/..." />
        </div>
      </div>

      <div className="bg-surface-container-low border border-outline-variant/20 p-8 mb-8">
        <p className="font-mono text-[10px] text-outline tracking-widest uppercase mb-2">TIMEFRAME</p>
        <p className="font-mono text-[9px] text-outline/60 tracking-widest mb-6">
          STATUS (INCOMING / ONGOING / PAST) IS DERIVED FROM THESE DATES
        </p>
        <div className="grid grid-cols-2 gap-5">
          <AdminInput label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <AdminInput label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <AdminInput label="Display Order" type="number" value={displayOrder} onChange={(e) => setDisplayOrder(Number(e.target.value))} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving}
          className="font-mono text-[10px] uppercase tracking-widest px-8 py-3 bg-primary text-surface-container-lowest hover:bg-primary-dim disabled:opacity-40 transition-colors duration-200">
          {saving ? 'SAVING...' : isEdit ? 'SAVE CHANGES' : 'CREATE HACKATHON'}
        </button>
        <a href="/admin/hackathons" className="font-mono text-[10px] uppercase tracking-widest px-6 py-3 border border-outline-variant/30 text-outline hover:text-on-surface transition-colors duration-200">
          CANCEL
        </a>
        {isEdit && (
          <button type="button" onClick={handleDelete}
            className="ml-auto font-mono text-[10px] uppercase tracking-widest px-6 py-3 border border-error/30 text-error/60 hover:text-error hover:border-error/60 transition-colors duration-200">
            DELETE
          </button>
        )}
      </div>
    </form>
  );
}
