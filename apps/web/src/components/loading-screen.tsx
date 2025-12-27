import { cn } from '@/lib/utils'

interface LoadingScreenProps {
  text?: string
  variant?: 'screen' | 'content'
}

export function LoadingScreen({
  text = 'Carregando...',
  variant = 'screen',
}: LoadingScreenProps) {
  return (
    <div
      className={cn('flex items-center justify-center', {
        'min-h-screen': variant === 'screen',
        'py-12': variant === 'content',
      })}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-gray-300" />
        <p className="text-muted-foreground text-sm">{text}</p>
      </div>
    </div>
  )
}
