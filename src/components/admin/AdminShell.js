'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { ToastProvider } from './Toast';

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === '/admin/login' || pathname === '/admin/login/';
  const [authChecked, setAuthChecked] = useState(isLogin);

  useEffect(() => {
    if (isLogin) return;
    fetch('/api/admin/auth')
      .then(res => {
        if (!res.ok) {
          router.replace('/admin/login');
        } else {
          setAuthChecked(true);
        }
      })
      .catch(() => router.replace('/admin/login'));
  }, [isLogin, router]);

  if (isLogin) {
    return <>{children}</>;
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-charcoal-light text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-cream">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 ml-64 mt-14 p-8">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
