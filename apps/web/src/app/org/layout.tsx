import { AppShell } from '@/components/app-shell'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { getOrganizations } from '@/http/get-organizations'
import { getProfile } from '@/http/get-profile'
import { cookies } from 'next/headers'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  const { user } = await getProfile()
  const { organizations } = await getOrganizations()

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <AppShell user={user} organizations={organizations}>
        {children}
      </AppShell>
    </SidebarProvider>
  )
}
