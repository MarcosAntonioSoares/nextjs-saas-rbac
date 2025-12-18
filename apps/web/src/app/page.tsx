import { LogoutButton } from '@/components/auth/logout-button'
import { Profile } from '@/components/profile'

export default function Home() {
  return (
    <div>
      <Profile /> <LogoutButton />
    </div>
  )
}
