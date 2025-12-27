import { getOrganizations } from '@/http/get-organizations'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  if (process.env.NODE_ENV === 'development') {
    await new Promise((resolve) => setTimeout(resolve, 2000)) // 2 segundos
  }

  const cookieStore = await cookies()
  const orgFromCookie = cookieStore.get('org')?.value

  if (orgFromCookie) {
    redirect(`/org/${orgFromCookie}`)
  }

  const { organizations } = await getOrganizations()

  if (organizations.length > 0) {
    redirect(`/org/${organizations[0].slug}`)
  }

  redirect('/onboarding')
}
