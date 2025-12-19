import { getServerApi } from '@/http/api-server'

interface GetProfileResponse {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
}

export async function getProfile() {
  const api = await getServerApi()
  return api.get('profile').json<GetProfileResponse>()
}
