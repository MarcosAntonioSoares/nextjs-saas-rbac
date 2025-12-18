'use client'

import { Button } from '@/components/ui/button'
import { logout } from '@/http/logout'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export function LogoutButton() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    try {
      setIsLoggingOut(true)

      await logout()

      toast.success('You have been logged out')

      router.push('/sign-in')
      router.refresh()
    } catch {
      toast.error('Failed to logout')
      setIsLoggingOut(false)
    }
  }

  return <Button onClick={handleLogout}>Logout</Button>
}
