'use client'

import type { AppAbility } from '@saas/auth'
import { defineAbilityFor } from '@saas/auth'
import { createContext, useContext, useMemo } from 'react'

export interface AbilityUser {
  id: string
  role: 'ADMIN' | 'MEMBER' | 'BILLING'
  organizationId: string
}

const AbilityContext = createContext<AppAbility | null>(null)

interface AbilityProviderProps {
  abilityUser?: AbilityUser
  children: React.ReactNode
}

export function AbilityProvider({
  abilityUser,
  children,
}: AbilityProviderProps) {
  const ability = useMemo(() => {
    if (!abilityUser) return null
    return defineAbilityFor(abilityUser)
  }, [abilityUser])

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  )
}

export function useAbility(): AppAbility {
  const ability = useContext(AbilityContext)

  if (!ability) {
    throw new Error('useAbility must be used within AbilityProvider')
  }

  return ability
}

export function useSafeAbility(): AppAbility | null {
  return useContext(AbilityContext)
}

export function useHasOrganization(): boolean {
  const ability = useContext(AbilityContext)
  return ability !== null
}
