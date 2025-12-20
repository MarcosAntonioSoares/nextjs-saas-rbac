export default function DashboardLoading() {
  return (
    <div className="flex h-screen">
      <aside className="bg-muted w-64 animate-pulse" />
      <main className="flex-1 space-y-4 p-6">
        <div className="bg-muted h-6 w-1/3 rounded" />
        <div className="bg-muted h-32 rounded" />
        <div className="bg-muted h-32 rounded" />
      </main>
    </div>
  )
}
