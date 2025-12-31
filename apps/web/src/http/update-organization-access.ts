import { getServerApi } from '@/http/api-server'

export async function updateOrganizationAccess(org: string) {
  const api = await getServerApi()
  return api.put(`organizations/${org}/access`)
}
