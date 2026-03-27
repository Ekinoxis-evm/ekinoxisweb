'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import AdminInput from '../components/AdminInput';
import AdminTextarea from '../components/AdminTextarea';
import ImageUpload from '../components/ImageUpload';
import type { Hacker } from '@/lib/supabase/types';

interface HackerFormProps { hacker?: Hacker }

export default function HackerForm({ hacker }: HackerFormProps) {
  const router = useRouter();
  const isEdit = !!hacker;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState(hacker?.name ?? '');
  const [imageUrl, setImageUrl] = useState(hacker?.image_url ?? '');
  const [profileEn, setProfileEn] = useState(hacker?.profile_en ?? '');
  const [profileEs, setProfileEs] = useState(hacker?.profile_es ?? '');
  const [university, setUniversity] = useState(hacker?.university ?? '');
  const [github, setGithub] = useState(hacker?.github ?? '');
  const [linkedin, setLinkedin] = useState(hacker?.linkedin ?? '');
  const [x, setX] = useState(hacker?.x ?? '');
  const [telegram, setTelegram] = useState(hacker?.telegram ?? '');
  const [discord, setDiscord] = useState(hacker?.discord ?? '');
  const [website, setWebsite] = useState(hacker?.website ?? '');
  const [displayOrder, setDisplayOrder] = useState(hacker?.display_order ?? 0);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setError('');

    const payload = {
      name, image_url: imageUrl, profile_en: profileEn, profile_es: profileEs,
      university: university || null,
      github, linkedin, x,
      telegram: telegram || null, discord: discord || null, website: website || null,
      display_order: displayOrder,
    };

    try {
      const url = isEdit ? `/api/admin/hackers/${hacker.id}` : '/api/admin/hackers';
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
      router.push('/admin/hackers'); router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!isEdit || !confirm('Delete this hacker?')) return;
    const res = await fetch(`/api/admin/hackers/${hacker.id}`, { method: 'DELETE' });
    if (res.ok) { router.push('/admin/hackers'); router.refresh(); }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-8">
        <span className="border border-primary/30 px-2 py-1">EKX_ADMIN</span>
        <span className="text-outline">/</span>
        <a href="/admin/hackers" className="border border-primary/30 px-2 py-1 hover:border-primary/60">HACKERS</a>
        <span className="text-outline">/</span>
        <span className="border border-primary/30 px-2 py-1">{isEdit ? 'EDIT' : 'NEW'}</span>
      </div>

      <h1 className="font-headline text-5xl font-bold tracking-tighter leading-[0.9] uppercase text-on-surface mb-10">
        {isEdit ? 'EDIT' : 'NEW'} <span className="text-primary">HACKER</span>
      </h1>

      {error && (
        <div className="mb-6 border border-error/40 bg-error/5 px-4 py-3">
          <p className="font-mono text-[10px] text-error tracking-widest uppercase">{error}</p>
        </div>
      )}

      <div className="bg-surface-container-low border border-outline-variant/20 p-8 mb-4">
        <p className="font-mono text-[10px] text-outline tracking-widest uppercase mb-6">IDENTITY</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AdminInput label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <ImageUpload label="Photo *" value={imageUrl} onChange={setImageUrl} folder="hackers" hint="Upload new or keep existing /hackers/ path" />
          <AdminInput label="Role / Profile (EN)" value={profileEn} onChange={(e) => setProfileEn(e.target.value)} required placeholder="Full Stack Developer" />
          <AdminInput label="Role / Profile (ES)" value={profileEs} onChange={(e) => setProfileEs(e.target.value)} required placeholder="Desarrollador Full Stack" />
          <AdminInput label="University" value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="USC, ICESI... (leave blank for Anon)" />
          <AdminInput label="Display Order" type="number" value={displayOrder} onChange={(e) => setDisplayOrder(Number(e.target.value))} />
        </div>
      </div>

      <div className="bg-surface-container-low border border-outline-variant/20 p-8 mb-4">
        <p className="font-mono text-[10px] text-outline tracking-widest uppercase mb-2">SOCIAL LINKS</p>
        <p className="font-mono text-[9px] text-outline/60 tracking-widest mb-6">GITHUB, LINKEDIN, X — REQUIRED</p>
        <div className="grid grid-cols-1 gap-5">
          <AdminInput label="GitHub" value={github} onChange={(e) => setGithub(e.target.value)} required placeholder="https://github.com/username" />
          <AdminInput label="LinkedIn" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} required placeholder="https://linkedin.com/in/username" />
          <AdminInput label="X / Twitter" value={x} onChange={(e) => setX(e.target.value)} required placeholder="https://x.com/username" />
        </div>
      </div>

      <div className="bg-surface-container-low border border-outline-variant/20 p-8 mb-8">
        <p className="font-mono text-[10px] text-outline tracking-widest uppercase mb-2">OPTIONAL SOCIALS</p>
        <p className="font-mono text-[9px] text-outline/60 tracking-widest mb-6">TELEGRAM, DISCORD, PORTFOLIO — OPTIONAL</p>
        <div className="grid grid-cols-1 gap-5">
          <AdminInput label="Telegram" value={telegram} onChange={(e) => setTelegram(e.target.value)} placeholder="https://t.me/username" />
          <AdminInput label="Discord" value={discord} onChange={(e) => setDiscord(e.target.value)} placeholder="username#0000 or Discord link" />
          <AdminInput label="Portfolio Website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://myportfolio.dev" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving}
          className="font-mono text-[10px] uppercase tracking-widest px-8 py-3 bg-primary text-surface-container-lowest hover:bg-primary-dim disabled:opacity-40 transition-colors duration-200">
          {saving ? 'SAVING...' : isEdit ? 'SAVE CHANGES' : 'CREATE HACKER'}
        </button>
        <a href="/admin/hackers" className="font-mono text-[10px] uppercase tracking-widest px-6 py-3 border border-outline-variant/30 text-outline hover:text-on-surface transition-colors duration-200">
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
