'use client'

import { Header } from '@/components/header/header'
import { SidebarInset } from '@/components/ui/sidebar'
import { getMembership } from '@/http/get-membership'
import { AbilityProvider } from '@/providers/ability-provider'
import type { Role } from '@saas/auth'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string | null
  email: string
  avatarUrl: string | null
}

interface Organization {
  id: string
  name: string
  slug: string
  avatarUrl: string | null
  role: 'ADMIN' | 'MEMBER' | 'BILLING'
}

interface AppShellProps {
  user: User
  organizations: Organization[]
  children: React.ReactNode
}

export function AppShell({ user, organizations, children }: AppShellProps) {
  const params = useParams<{ slug?: string }>()
  const router = useRouter()
  const [membership, setMembership] = useState<{
    role: Role
    organizationId: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const activeSlug = params?.slug
  const currentOrg = activeSlug
    ? organizations.find((org) => org.slug === activeSlug)
    : undefined

  useEffect(() => {
    async function loadMembership() {
      if (!activeSlug) {
        setMembership(null)
        return
      }

      if (!currentOrg) {
        router.push('/org')
        return
      }

      setIsLoading(true)
      try {
        const data = await getMembership(activeSlug)
        setMembership({
          role: data.membership.role,
          organizationId: data.membership.organizationId,
        })
      } catch (error) {
        console.error('Failed to load membership:', error)
        router.push('/org')
      } finally {
        setIsLoading(false)
      }
    }

    loadMembership()
  }, [activeSlug, currentOrg, router])

  const content = (
    <SidebarInset>
      <Header
        user={user}
        organizations={organizations}
        currentOrg={currentOrg}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="px-4 py-4 md:px-6 md:py-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
                <p className="text-muted-foreground text-sm">
                  Carregando organização...
                </p>
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </main>
    </SidebarInset>
  )

  if (membership && !isLoading) {
    return (
      <AbilityProvider
        abilityUser={{
          id: user.id,
          role: membership.role,
          organizationId: membership.organizationId,
        }}
      >
        {content}
      </AbilityProvider>
    )
  }

  // Sem membership (páginas como create-organization)
  return content
}
