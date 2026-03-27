'use client';

import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  async function handleGoogleLogin() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin/auth/callback`,
      },
    });
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline-overlay opacity-20" />

      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-6">
            <span className="border border-primary/30 px-2 py-1">EKX_ROOT</span>
            <span className="text-outline">/</span>
            <span className="border border-primary/30 px-2 py-1">ADMIN_ACCESS</span>
          </div>
          <h1 className="font-headline text-5xl font-bold tracking-tighter leading-[0.9] uppercase text-on-surface mb-3">
            SYSTEM<span className="text-primary"> ACCESS</span>
          </h1>
          <p className="font-mono text-[11px] text-on-surface-variant tracking-wide">
            AUTHORIZED PERSONNEL ONLY — EKINOXIS LABS
          </p>
        </div>

        {/* Login card */}
        <div className="bg-surface-container-low border border-outline-variant/20 p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-primary animate-pulse" />
            <span className="font-mono text-[10px] text-primary tracking-widest uppercase">
              AWAITING AUTHENTICATION
            </span>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-transparent border border-primary/40 hover:border-primary hover:bg-primary/5 text-on-surface hover:text-primary font-label text-xs uppercase tracking-tighter py-4 px-6 transition-all duration-200 group"
          >
            {/* Google icon */}
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            SIGN IN WITH GOOGLE
          </button>

          <p className="mt-6 font-mono text-[9px] text-outline tracking-widest text-center">
            ACCESS RESTRICTED TO AUTHORIZED ADMIN ACCOUNTS
          </p>
        </div>
      </div>
    </div>
  );
}
