'use client'

import { Check, Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type ThemeValue = 'light' | 'dark' | 'system'

interface ThemeItemProps {
  value: ThemeValue
  label: string
  icon: React.ElementType
  active: boolean
  onSelect: (value: ThemeValue) => void
}

/**
 * Componente auxiliar (FORA do render)
 */
function ThemeItem({
  value,
  label,
  icon: Icon,
  active,
  onSelect,
}: ThemeItemProps) {
  return (
    <DropdownMenuItem
      onClick={() => onSelect(value)}
      className="flex items-center justify-between gap-3"
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>

      {active && <Check className="h-4 w-4 opacity-70" />}
    </DropdownMenuItem>
  )
}

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {isDark ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <ThemeItem
          value="light"
          label="Light"
          icon={Sun}
          active={theme === 'light'}
          onSelect={setTheme}
        />

        <ThemeItem
          value="dark"
          label="Dark"
          icon={Moon}
          active={theme === 'dark'}
          onSelect={setTheme}
        />

        <ThemeItem
          value="system"
          label="System"
          icon={Monitor}
          active={theme === 'system'}
          onSelect={setTheme}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
