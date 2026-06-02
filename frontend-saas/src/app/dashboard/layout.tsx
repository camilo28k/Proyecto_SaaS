import { Sidebar } from '@/components/shared/sidebar';
import { Navbar } from '@/components/shared/navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dash-layout">
      <Sidebar />
      <div className="dash-content">
        <Navbar />
        <main className="dash-main">
          {children}
        </main>
      </div>
    </div>
  );
}
