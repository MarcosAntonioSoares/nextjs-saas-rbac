import { AppSidebar } from '@/components/app-sidebar'
import { Header } from '@/components/header/header'
import { OrgListBoundary } from '@/components/org-list-boundary'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getOrganizations } from '@/http/get-organizations'
import { getProfile } from '@/http/get-profile'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  const profile = await getProfile().catch(() => null)

  if (!profile) {
    redirect('/auth/sign-in')
  }

  const { user } = profile
  const { organizations } = await getOrganizations()

  return (
    <OrgListBoundary organizations={organizations}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header user={user} />
          <main className="flex-1 overflow-y-auto">
            <div className="px-4 py-4 md:px-6 md:py-6">{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </OrgListBoundary>
  )
}
