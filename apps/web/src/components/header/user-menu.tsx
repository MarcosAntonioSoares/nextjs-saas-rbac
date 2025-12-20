'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLogout } from '@/hooks/use-logout'
import { getInitials } from '@/lib/get-initials'
import { ChevronDown, LogOut, Send, Settings, User } from 'lucide-react'

interface UserMenuProps {
  user: {
    name: string | null
    email: string
    avatarUrl: string | null
    role?: string
  }
}

export function UserMenu({ user }: UserMenuProps) {
  const { logout } = useLogout()

  const initials = getInitials(user.name)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-accent h-10 gap-3 pr-3 pl-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.avatarUrl ?? 'underlined'}
              alt={user.name ?? undefined}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-left">
            <span className="text-sm leading-none font-medium">
              {user.name ?? undefined}
            </span>
            <span className="text-muted-foreground mt-1 text-xs leading-none">
              Organization admin
            </span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <div className="flex items-center gap-3 p-3">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={user.avatarUrl ?? 'underlined'}
              alt={user.name ?? undefined}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              {user.name ?? undefined}
            </p>
            <p className="text-muted-foreground truncate text-xs">
              {user.email ?? undefined}
            </p>
            <button className="text-primary mt-0.5 text-xs hover:underline">
              Organization admin
            </button>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-3 py-2.5">
          <User className="h-5 w-5" />
          <span>Your profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-3 py-2.5">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-3 py-2.5">
          <Send className="h-5 w-5" />
          <span>Send feedback</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer gap-3 py-2.5"
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
