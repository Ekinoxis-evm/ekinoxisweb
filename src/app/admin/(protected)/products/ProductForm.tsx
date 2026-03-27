'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import AdminInput from '../components/AdminInput';
import AdminTextarea from '../components/AdminTextarea';
import AdminSelect from '../components/AdminSelect';
import TagInput from '../components/TagInput';
import ImageUpload from '../components/ImageUpload';
import type { ProductWithRelations, Hackathon, Hacker } from '@/lib/supabase/types';

interface ProductFormProps {
  product?: ProductWithRelations
  hackathons: Hackathon[]
  allHackers: Hacker[]
}

const STATUS_OPTIONS = [
  { value: 'POC', label: 'POC' },
  { value: 'MVP', label: 'MVP' },
  { value: 'BETA', label: 'BETA' },
  { value: 'LAUNCHED', label: 'LAUNCHED' },
]

export default function ProductForm({ product, hackathons, allHackers }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!product;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState(product?.name ?? '');
  const [descEn, setDescEn] = useState(product?.description_en ?? '');
  const [descEs, setDescEs] = useState(product?.description_es ?? '');
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? '');
  const [status, setStatus] = useState(product?.status ?? 'MVP');
  const [websiteUrl, setWebsiteUrl] = useState(product?.website_url ?? '');
  const [appUrl, setAppUrl] = useState(product?.app_url ?? '');
  const [repoFrontend, setRepoFrontend] = useState(product?.repo_frontend ?? '');
  const [repoBackend, setRepoBackend] = useState(product?.repo_backend ?? '');
  const [repoContracts, setRepoContracts] = useState(product?.repo_contracts ?? '');
  const [hackathonId, setHackathonId] = useState(product?.hackathon_id ?? '');
  const [hackathonLink, setHackathonLink] = useState(product?.hackathon_link ?? '');
  const [technologies, setTechnologies] = useState<string[]>(product?.technologies ?? []);
  const [categories, setCategories] = useState<string[]>(product?.categories ?? []);
  const [selectedHackers, setSelectedHackers] = useState<string[]>(
    product?.hackers?.map((h) => h.id) ?? []
  );
  const [displayOrder, setDisplayOrder] = useState(product?.display_order ?? 0);

  function toggleHacker(id: string) {
    setSelectedHackers((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = {
        name, description_en: descEn, description_es: descEs,
        image_url: imageUrl, status,
        website_url: websiteUrl || null, app_url: appUrl || null,
        repo_frontend: repoFrontend || null, repo_backend: repoBackend || null,
        repo_contracts: repoContracts || null,
        hackathon_id: hackathonId || null, hackathon_link: hackathonLink || null,
        technologies, categories, display_order: displayOrder,
        hackerIds: selectedHackers,
      };

      const url = isEdit ? `/api/admin/products/${product.id}` : '/api/admin/products';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = `Save failed (${res.status})`;
        try { const d = await res.json(); msg = d.error ?? msg; } catch {}
        setError(msg);
        setSaving(false);
        return;
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!isEdit || !confirm('Delete this product? This cannot be undone.')) return;
    const res = await fetch(`/api/admin/products/${product.id}`, { method: 'DELETE' });
    if (res.ok) { router.push('/admin/products'); router.refresh(); }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-8">
        <span className="border border-primary/30 px-2 py-1">EKX_ADMIN</span>
        <span className="text-outline">/</span>
        <a href="/admin/products" className="border border-primary/30 px-2 py-1 hover:border-primary/60">PRODUCTS</a>
        <span className="text-outline">/</span>
        <span className="border border-primary/30 px-2 py-1">{isEdit ? 'EDIT' : 'NEW'}</span>
      </div>

      <h1 className="font-headline text-5xl font-bold tracking-tighter leading-[0.9] uppercase text-on-surface mb-10">
        {isEdit ? 'EDIT' : 'NEW'} <span className="text-primary">PRODUCT</span>
      </h1>

      {error && (
        <div className="mb-6 border border-error/40 bg-error/5 px-4 py-3">
          <p className="font-mono text-[10px] text-error tracking-widest uppercase">{error}</p>
        </div>
      )}

      {/* Core info */}
      <div className="bg-surface-container-low border border-outline-variant/20 p-8 mb-4">
        <p className="font-mono text-[10px] text-outline tracking-widest uppercase mb-6">CORE INFO</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <AdminInput label="Product Name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="ETHCALI Wallet" />
          </div>
          <AdminTextarea label="Description (EN)" value={descEn} onChange={(e) => setDescEn(e.target.value)} required rows={4} />
          <AdminTextarea label="Description (ES)" value={descEs} onChange={(e) => setDescEs(e.target.value)} required rows={4} />
          <ImageUpload label="Product Image *" value={imageUrl} onChange={setImageUrl} folder="products" hint="Upload new or keep existing /products/ path" />
          <AdminSelect label="Status" value={status} onChange={(e) => setStatus(e.target.value as typeof status)} options={STATUS_OPTIONS} required />
          <AdminInput label="Display Order" type="number" value={displayOrder} onChange={(e) => setDisplayOrder(Number(e.target.value))} />
        </div>
      </div>

      {/* URLs */}
      <div className="bg-surface-container-low border border-outline-variant/20 p-8 mb-4">
        <p className="font-mono text-[10px] text-outline tracking-widest uppercase mb-6">URLS</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AdminInput label="Website URL" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://myproduct.xyz" />
          <AdminInput label="App URL" value={appUrl} onChange={(e) => setAppUrl(e.target.value)} placeholder="https://app.myproduct.xyz" hint="Separate app if different from website" />
        </div>
      </div>

      {/* Repositories */}
      <div className="bg-surface-container-low border border-outline-variant/20 p-8 mb-4">
        <p className="font-mono text-[10px] text-outline tracking-widest uppercase mb-6">REPOSITORIES</p>
        <div className="grid grid-cols-1 gap-5">
          <AdminInput label="Frontend Repo" value={repoFrontend} onChange={(e) => setRepoFrontend(e.target.value)} placeholder="https://github.com/org/repo-fe" />
          <AdminInput label="Backend Repo" value={repoBackend} onChange={(e) => setRepoBackend(e.target.value)} placeholder="https://github.com/org/repo-be" />
          <AdminInput label="Contracts Repo" value={repoContracts} onChange={(e) => setRepoContracts(e.target.value)} placeholder="https://github.com/org/repo-contracts" />
        </div>
      </div>

      {/* Hackathon */}
      <div className="bg-surface-container-low border border-outline-variant/20 p-8 mb-4">
        <p className="font-mono text-[10px] text-outline tracking-widest uppercase mb-6">HACKATHON</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AdminSelect
            label="Hackathon"
            value={hackathonId}
            onChange={(e) => setHackathonId(e.target.value)}
            options={hackathons.map((h) => ({ value: h.id, label: h.name }))}
          />
          <AdminInput label="Hackathon Link" value={hackathonLink} onChange={(e) => setHackathonLink(e.target.value)} placeholder="https://ethglobal.com/events/..." />
        </div>
      </div>

      {/* Tags */}
      <div className="bg-surface-container-low border border-outline-variant/20 p-8 mb-4">
        <p className="font-mono text-[10px] text-outline tracking-widest uppercase mb-6">TAGS</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TagInput label="Technologies" value={technologies} onChange={setTechnologies} placeholder="Blockchain, AI..." />
          <TagInput label="Categories" value={categories} onChange={setCategories} placeholder="DeFi, RWA, NFTs..." />
        </div>
      </div>

      {/* Hackers */}
      <div className="bg-surface-container-low border border-outline-variant/20 p-8 mb-8">
        <p className="font-mono text-[10px] text-outline tracking-widest uppercase mb-6">
          HACKERS INVOLVED
          <span className="text-primary ml-2">({selectedHackers.length} selected)</span>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-outline-variant/10">
          {allHackers.map((h) => {
            const selected = selectedHackers.includes(h.id);
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => toggleHacker(h.id)}
                className={`px-4 py-3 text-left transition-colors duration-200 ${selected ? 'bg-primary/10 border border-primary/30' : 'bg-surface-container hover:bg-surface-container-high border border-transparent'}`}
              >
                <div className={`font-mono text-[10px] uppercase tracking-widest ${selected ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {selected && '▶ '}{h.name}
                </div>
                <div className="font-mono text-[9px] text-outline mt-0.5">{h.profile_en}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="font-mono text-[10px] uppercase tracking-widest px-8 py-3 bg-primary text-surface-container-lowest hover:bg-primary-dim disabled:opacity-40 transition-colors duration-200"
        >
          {saving ? 'SAVING...' : isEdit ? 'SAVE CHANGES' : 'CREATE PRODUCT'}
        </button>
        <a href="/admin/products" className="font-mono text-[10px] uppercase tracking-widest px-6 py-3 border border-outline-variant/30 text-outline hover:text-on-surface transition-colors duration-200">
          CANCEL
        </a>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="ml-auto font-mono text-[10px] uppercase tracking-widest px-6 py-3 border border-error/30 text-error/60 hover:text-error hover:border-error/60 transition-colors duration-200"
          >
            DELETE
          </button>
        )}
      </div>
    </form>
  );
}
