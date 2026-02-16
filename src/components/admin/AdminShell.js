'use client';

import { usePathname } from 'next/navigation';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { ToastProvider } from './Toast';

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login' || pathname === '/admin/login/';

  if (isLogin) {
    return <>{children}</>;
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
