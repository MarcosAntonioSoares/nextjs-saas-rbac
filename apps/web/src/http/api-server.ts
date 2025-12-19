import ky from 'ky'
import { cookies } from 'next/headers'

export async function getServerApi() {
  const cookieStore = await cookies()

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ')

  return ky.create({
    prefixUrl: 'http://localhost:3333',
    headers: {
      cookie: cookieHeader,
    },
  })
}
