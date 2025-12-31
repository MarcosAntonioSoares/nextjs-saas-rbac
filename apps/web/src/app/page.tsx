import { getOrganizations } from '@/http/get-organizations'
import { redirect } from 'next/navigation'

export default async function Home() {
  if (process.env.NODE_ENV === 'development') {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  const { organizations } = await getOrganizations()

  const mostRecentOrg = organizations[0]

  redirect(`/org/${mostRecentOrg.slug}`)
}
