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
import { useOrgStore } from '@/stores/useOrgStore'
import { Building2, Check, ChevronsUpDown, Plus } from 'lucide-react'
import Link from 'next/link'

export function OrganizationSelector() {
  const organizations = useOrgStore((s) => s.organizations)
  const activeOrg = useOrgStore((s) => s.activeOrg)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex w-64 items-center justify-between"
          variant="ghost"
        >
          {activeOrg ? (
            <>
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Avatar className="h-5 w-5 shrink-0">
                  <AvatarImage
                    src={activeOrg.avatarUrl || '/placeholder.svg'}
                    alt={`${activeOrg.name} avatar`}
                  />
                  <AvatarFallback>{getInitials(activeOrg.name)}</AvatarFallback>
                </Avatar>
                <span className="truncate font-medium">{activeOrg.name}</span>
              </div>
              <Badge className="ml-auto h-5" variant="secondary">
                {capitalize(activeOrg.role)}
              </Badge>
              <ChevronsUpDown className="opacity-50" />
            </>
          ) : (
            <>
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Building2 className="text-muted-foreground h-5 w-5 shrink-0" />
                <span className="text-muted-foreground truncate">
                  Selecione uma organização
                </span>
                <ChevronsUpDown className="opacity-50" />
              </div>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 rounded-lg"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        {organizations.length === 0 ? (
          <div className="text-muted-foreground p-4 text-center text-sm">
            Você não pertence a nenhuma organização ainda
          </div>
        ) : (
          organizations.map((org) => {
            const isActive = org.slug === activeOrg?.slug

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
                  <Avatar className="h-5 w-5 shrink-0">
                    <AvatarImage
                      src={org.avatarUrl || '/placeholder.svg'}
                      alt={`${org.name} avatar`}
                    />
                    <AvatarFallback>{getInitials(org.name)}</AvatarFallback>
                  </Avatar>
                  <div className="truncate font-medium">{org.name}</div>

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
          })
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 p-2" asChild>
          <Link href="/org/create-organization">
            <div className="bg-background flex size-6 items-center justify-center rounded-md border">
              <Plus className="size-5" />
            </div>
            <div className="text-muted-foreground font-medium">
              Add Organization
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
