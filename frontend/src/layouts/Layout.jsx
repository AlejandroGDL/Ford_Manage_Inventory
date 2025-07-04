import {Outlet} from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "../components/ui/app-sidebar"

export default function Layout() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className='flex flex-col h-screen w-screen overflow-auto'>
          <SidebarTrigger style={{ background: "transparent" }}/>
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  )
}