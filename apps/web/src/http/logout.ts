import { api } from '@/http/api-client'

export async function logout() {
  await api.delete('sessions/logout', {
    headers: {
      'content-type': undefined,
    },
  })
}
