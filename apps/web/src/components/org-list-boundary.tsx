'use client'
import { useOrgStore, type ActiveOrg } from '@/stores/useOrgStore'
import { useEffect } from 'react'

interface OrgListBoundaryProps {
  organizations: ActiveOrg[]
  children: React.ReactNode
}

export function OrgListBoundary({
  organizations,
  children,
}: OrgListBoundaryProps) {
  const setOrganizations = useOrgStore((s) => s.setOrganizations)

  useEffect(() => {
    setOrganizations(organizations)
  }, [organizations, setOrganizations])

  return children
}
