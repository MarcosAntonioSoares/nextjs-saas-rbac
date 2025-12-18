import { LogoutButton } from '@/components/auth/logout-button'
import { ModeToggle } from '@/components/mode-toggle'
import { Profile } from '@/components/profile'

export default function Home() {
  return (
    <div>
      <Profile />
      <LogoutButton />
      <ModeToggle />
    </div>
  )
}
