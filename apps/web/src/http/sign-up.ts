import { api } from '@/http/api-client'
interface SignUpRequest {
  name: string
  email: string
  password: string
}

interface SignUpResponse {
  message?: string
}

export async function signUp({ name, email, password }: SignUpRequest) {
  const result = await api
    .post('users', {
      json: {
        name,
        email,
        password,
      },
    })
    .json<SignUpResponse>()

  return result
}
