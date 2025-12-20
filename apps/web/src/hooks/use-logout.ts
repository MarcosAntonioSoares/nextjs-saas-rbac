'use client'

import { logout } from '@/http/logout'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function useLogout() {
  const router = useRouter()

  async function handleLogout() {
    try {
      await logout()

      toast.success('You have been logged out')

      router.push('/sign-in')
      router.refresh()
    } catch {
      toast.error('Failed to logout')
    }
  }

  return { logout: handleLogout }
}
