'use client'
import type { AppAbility, Role } from '@saas/auth'
import { defineAbilityFor } from '@saas/auth'
import { create } from 'zustand'

export interface ActiveOrg {
  id: string
  name: string
  slug: string
  avatarUrl: string | null
  role: Role
}

export interface AbilityUser {
  id: string
  role: Role
  organizationId: string
}

interface OrgState {
  organizations: ActiveOrg[]
  activeOrg?: ActiveOrg // ← Guarda o objeto completo
  member?: AbilityUser
  ability?: AppAbility
  setOrganizations: (orgs: ActiveOrg[]) => void
  setActiveOrg: (org: ActiveOrg) => void // ← Seta objeto completo
  setMember: (member: AbilityUser) => void
  resetAbility: () => void
}

export const useOrgStore = create<OrgState>((set) => ({
  organizations: [],
  activeOrg: undefined,
  member: undefined,
  ability: undefined,

  setOrganizations: (orgs) => {
    set({ organizations: orgs })
  },

  setActiveOrg: (org) => {
    set({ activeOrg: org })
  },

  setMember: (member) => {
    const ability = defineAbilityFor(member)
    set({ member, ability })
  },

  resetAbility: () =>
    set({
      activeOrg: undefined,
      member: undefined,
      ability: undefined,
    }),
}))
