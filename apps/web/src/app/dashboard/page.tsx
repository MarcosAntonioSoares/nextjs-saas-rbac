import { LogoutButton } from '@/components/auth/logout-button'
import { ModeToggle } from '@/components/mode-toggle'
import { Profile } from '@/components/profile'
import { getProfile } from '@/http/get-profile'

export default async function Home() {
  const { user } = await getProfile()
  return (
    <div>
      <Profile user={user} />
      <LogoutButton />
      <ModeToggle />
    </div>
  )
}
