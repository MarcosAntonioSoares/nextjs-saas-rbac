import { getServerApi } from '@/http/api-server'
import { unstable_noStore as noStore } from 'next/cache'

interface GetOrganizationsResponse {
  organizations: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
    role: 'ADMIN' | 'MEMBER' | 'BILLING'
    lastAccessedAt: Date | null
  }[]
}

export async function getOrganizations() {
  noStore()
  const api = await getServerApi()
  return api.get('organizations').json<GetOrganizationsResponse>()
}
