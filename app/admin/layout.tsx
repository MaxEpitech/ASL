import { SessionProvider } from 'next-auth/react';
import { AdminSidebar } from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 p-8 lg:ml-0 ml-0">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
