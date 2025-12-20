export default function Loading() {
  return (
    <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="animate-in fade-in flex flex-col items-center gap-3 duration-300">
        <div className="border-muted border-t-primary h-8 w-8 animate-spin rounded-full border-2" />
        <span className="text-muted-foreground text-sm">
          Loading application…
        </span>
      </div>
    </div>
  )
}
