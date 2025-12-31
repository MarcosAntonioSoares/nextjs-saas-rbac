'use client'

import { useOrgStore } from '@/stores/useOrgStore'
import { Role } from '@saas/auth'
import { useEffect } from 'react'

export function OrgBoundary({
  children,
  slug,
  membership,
}: {
  children: React.ReactNode
  slug: string
  membership: {
    userId: string
    role: Role
    organizationId: string
  }
}) {
  const { organizations, setActiveOrg, setMember } = useOrgStore()

  useEffect(() => {
    const org = organizations.find((o) => o.slug === slug)
    if (!org) return

    setActiveOrg({
      ...org,
      role: membership.role,
    })

    setMember({
      id: membership.userId,
      role: membership.role,
      organizationId: membership.organizationId,
    })
  }, [slug, membership, organizations, setActiveOrg, setMember])

  return children
}
