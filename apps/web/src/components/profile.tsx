'use client'

interface ProfileProps {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
}

export function Profile({ user }: ProfileProps) {
  return (
    <div>
      <h1>{user.id}</h1>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user.avatarUrl}</h1>
    </div>
  )
}
