export default async function DashboardPage() {
  if (process.env.NODE_ENV === 'development') {
    await new Promise((r) => setTimeout(r, 2000))
  }

  return <div>home</div>
}
