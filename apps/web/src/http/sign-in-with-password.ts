import { api } from '@/http/api-client'

interface SignInWithPasswordRequest {
  email: string
  password: string
}

interface SignInResponse {
  message: string
}

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInResponse>()

  return result
}
