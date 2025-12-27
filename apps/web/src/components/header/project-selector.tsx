'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { capitalize } from '@/lib/capitalize'
import { getInitials } from '@/lib/get-initials'
import { cn } from '@/lib/utils'
import { useAbility } from '@/providers/ability-provider'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import Link from 'next/link'

interface Organizations {
  id: string
  name: string
  slug: string
  avatarUrl: string | null
  role: 'ADMIN' | 'MEMBER' | 'BILLING'
}

interface ProjectSelectorProps {
  activeOrg: Organizations
  organizations: Organizations[]
}

export function ProjectSelector({
  activeOrg,
  organizations,
}: ProjectSelectorProps) {
  const ability = useAbility()

  if (!ability.can('get', 'Project')) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex w-64 items-center justify-between"
          variant="ghost"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Avatar className="h-6 w-6 shrink-0">
              <AvatarImage
                src={activeOrg.avatarUrl || '/placeholder.svg'}
                alt={`${activeOrg.name} avatar`}
              />
              <AvatarFallback>{getInitials(activeOrg.name)}</AvatarFallback>
            </Avatar>
            <span className="truncate font-medium">{activeOrg.name}</span>
          </div>
          <Badge className="ml-auto h-5" variant="secondary">
            Admin
          </Badge>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 rounded-lg"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        {organizations.map((org) => {
          const isActive = org.slug === activeOrg.slug

          return (
            <DropdownMenuItem
              key={org.id}
              className={cn(
                'gap-2 p-2',
                isActive && 'bg-accent/50 font-medium'
              )}
              asChild
            >
              <Link href={`/org/${org.slug}`}>
                <Avatar className="h-6 w-6 shrink-0">
                  <AvatarImage
                    src={org.avatarUrl || '/placeholder.svg'}
                    alt={`${org.name} avatar`}
                  />
                  <AvatarFallback>{getInitials(org.name)}</AvatarFallback>
                </Avatar>

                {org.name}
                <div className="ml-auto flex items-center gap-1.5">
                  <Badge className="h-5" variant="secondary">
                    {capitalize(org.role)}
                  </Badge>
                  {isActive && (
                    <Check
                      className="text-muted-foreground h-4 w-4 shrink-0 font-bold"
                      strokeWidth={3}
                    />
                  )}
                </div>
              </Link>
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 p-2">
          <div className="bg-background flex size-6 items-center justify-center rounded-md border">
            <Plus className="size-4" />
          </div>
          <div className="text-muted-foreground font-medium">
            Add Organization
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
