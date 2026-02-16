import AdminShell from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'TM Admin',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
