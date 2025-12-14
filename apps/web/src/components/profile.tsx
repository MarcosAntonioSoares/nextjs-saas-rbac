'use client'

import { getProfile } from '@/http/get-profile'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ProfileProps {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
}

export function Profile() {
  const router = useRouter()
  const [user, setUser] = useState<ProfileProps['user']>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getProfile()
      .then((data) => setUser(data.user))
      .catch(() => router.push('/sign-in'))
      .finally(() => setIsLoading(false))
  }, [router])

  if (isLoading) return <div>Loading profile...</div>
  if (!user) return null

  return (
    <div>
      <h1>{user.id}</h1>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user.avatarUrl}</h1>
    </div>
  )
}
