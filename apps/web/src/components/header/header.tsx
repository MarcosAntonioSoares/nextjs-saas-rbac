import { NotificationsDropdown } from '@/components/notifications/notifications-dropdown'

import { OrganizationSelector } from '@/components/header/organization-selector'
import { ThemeToggle } from '@/components/theme-toggle'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserMenu } from './user-menu'

interface User {
  name: string | null
  email: string
  avatarUrl: string | null
  role?: string
}

interface Organization {
  id: string
  name: string
  slug: string
  avatarUrl: string | null
  role: 'ADMIN' | 'MEMBER' | 'BILLING'
}

interface HeaderProps {
  user: User
  organizations: Organization[]
  currentOrg?: Organization
}

export function Header({ user, organizations, currentOrg }: HeaderProps) {
  return (
    <header className="bg-background supports-backdrop-filter:bg-background/60 sticky top-0 z-30 flex h-14 items-center justify-between border-b px-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <div className="flex items-center gap-2 border-l pl-4">
          <OrganizationSelector
            activeOrg={currentOrg}
            organizations={organizations}
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <NotificationsDropdown />
        <ThemeToggle />
        <UserMenu user={user} />
      </div>
    </header>
  )
}
