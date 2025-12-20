'use client'

import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCheck,
  FileText,
  MessageSquare,
  Settings,
  UserPlus,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Notification {
  id: string
  title: string
  description: string
  date: string
  read: boolean
}

export function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />

          <span className="absolute top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] leading-none font-medium text-white">
            9+
          </span>

          <span className="sr-only">Notificações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <div className="flex items-center justify-between px-2 py-2">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="Mark all as read"
            >
              <CheckCheck className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-[450px] overflow-y-auto">
          {/* Notification 1 - New comment */}
          <DropdownMenuItem className="bg-accent/50 flex cursor-pointer items-start gap-3 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
              <MessageSquare className="h-5 w-5 text-blue-500" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    New comment on your post
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    <span className="text-foreground font-medium">
                      John Smith
                    </span>{' '}
                    replied: "Great work on the new features!"
                  </p>
                </div>
                <span className="text-muted-foreground shrink-0 text-xs">
                  2m
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="h-5 bg-blue-500/10 px-1.5 text-xs text-blue-600"
                >
                  Unread
                </Badge>
              </div>
            </div>
          </DropdownMenuItem>

          {/* Notification 2 - Task assigned */}
          <DropdownMenuItem className="bg-accent/50 flex cursor-pointer items-start gap-3 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/10">
              <FileText className="h-5 w-5 text-purple-500" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-semibold">Task assigned to you</p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    <span className="text-foreground font-medium">
                      Sarah Wilson
                    </span>{' '}
                    assigned you to "Update homepage design"
                  </p>
                </div>
                <span className="text-muted-foreground shrink-0 text-xs">
                  15m
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="h-5 bg-purple-500/10 px-1.5 text-xs text-purple-600"
                >
                  Unread
                </Badge>
              </div>
            </div>
          </DropdownMenuItem>

          {/* Notification 3 - New team member */}
          <DropdownMenuItem className="bg-accent/50 flex cursor-pointer items-start gap-3 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10">
              <UserPlus className="h-5 w-5 text-green-500" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-semibold">New team member</p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    <span className="text-foreground font-medium">
                      Alex Johnson
                    </span>{' '}
                    joined your organization
                  </p>
                </div>
                <span className="text-muted-foreground shrink-0 text-xs">
                  1h
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="h-5 bg-green-500/10 px-1.5 text-xs text-green-600"
                >
                  Unread
                </Badge>
              </div>
            </div>
          </DropdownMenuItem>

          {/* Notification 4 - Meeting reminder */}
          <DropdownMenuItem className="bg-accent/50 flex cursor-pointer items-start gap-3 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
              <Calendar className="h-5 w-5 text-orange-500" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-semibold">Meeting reminder</p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    Team standup starts in 15 minutes
                  </p>
                </div>
                <span className="text-muted-foreground shrink-0 text-xs">
                  2h
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="h-5 bg-orange-500/10 px-1.5 text-xs text-orange-600"
                >
                  Unread
                </Badge>
              </div>
            </div>
          </DropdownMenuItem>

          {/* Notification 5 - System alert (read) */}
          <DropdownMenuItem className="flex cursor-pointer items-start gap-3 p-3 opacity-60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    System maintenance scheduled
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    Scheduled maintenance on Dec 25 at 2:00 AM UTC
                  </p>
                </div>
                <span className="text-muted-foreground shrink-0 text-xs">
                  1d
                </span>
              </div>
            </div>
          </DropdownMenuItem>

          {/* Notification 6 - Project update (read) */}
          <DropdownMenuItem className="flex cursor-pointer items-start gap-3 p-3 opacity-60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-500/10">
              <FileText className="h-5 w-5 text-teal-500" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Project milestone completed
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    "Q4 Roadmap" has reached 100% completion
                  </p>
                </div>
                <span className="text-muted-foreground shrink-0 text-xs">
                  2d
                </span>
              </div>
            </div>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer justify-center text-sm font-medium">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
