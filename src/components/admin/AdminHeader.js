'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-charcoal flex items-center justify-between px-6">
      <Link href="/admin" className="font-serif text-xl text-white tracking-wide">
        TM Admin
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
        >
          View Site
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm text-white/40 hover:text-white transition-colors"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
