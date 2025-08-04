import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/ui/app-sidebar';
import { Toaster } from 'sonner';

export default function Layout() {
  return (
    <div>
      <SidebarProvider>
        <Toaster />
        <AppSidebar />
        <main className='flex flex-col h-screen w-screen overflow-auto'>
          <SidebarTrigger style={{ background: 'transparent' }} />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
