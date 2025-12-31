import { Role } from '@saas/auth'

import { getServerApi } from '@/http/api-server'

interface GetMembershipResponse {
  membership: {
    id: string
    role: Role
    userId: string
    organizationId: string
  }
}

export async function getMembership(org: string | undefined) {
  const api = await getServerApi()
  return api
    .get(`organizations/${org}/membership`)
    .json<GetMembershipResponse>()
}
