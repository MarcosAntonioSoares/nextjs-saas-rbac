import { AppSidebar } from '@/components/app-sidebar'
import { Header } from '@/components/header/header'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getProfile } from '@/http/get-profile'
import { cookies } from 'next/headers'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'
  const { user } = await getProfile()

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <Header user={user} />
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 py-4 md:px-6 md:py-6">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
