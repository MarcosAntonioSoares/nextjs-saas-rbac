import { api } from '@/http/api-client'

interface SignInWithGithubRequest {
  code: string
}

export async function signInWithGithub({ code }: SignInWithGithubRequest) {
  const response = await api.post('sessions/github', {
    json: { code },
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }
}
