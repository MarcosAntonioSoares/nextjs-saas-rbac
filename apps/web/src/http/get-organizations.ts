import { getServerApi } from '@/http/api-server'

interface GetOrganizationsResponse {
  organizations: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
    role: 'ADMIN' | 'MEMBER' | 'BILLING'
  }[]
}

export async function getOrganizations() {
  const api = await getServerApi()
  return api.get('organizations').json<GetOrganizationsResponse>()
}
