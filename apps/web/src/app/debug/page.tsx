'use client'

import { api } from '@/http/api-client'
import { useState } from 'react'

export default function DebugPage() {
  const [profile, setProfile] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function testAuth() {
    try {
      console.log('🔍 Testing authentication...')
      const response = await api.get('profile').json()
      console.log('✅ Profile:', response)
      setProfile(response)
      setError(null)
    } catch (err: any) {
      console.error('❌ Auth failed:', err)
      setError(err.message)
      setProfile(null)
    }
  }

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl">Debug Authentication</h1>

      <button
        onClick={testAuth}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Test Auth
      </button>

      <div className="mt-4">
        <h2 className="font-bold">Cookies (via document.cookie):</h2>
        <pre className="mt-2 rounded bg-gray-100 p-2">
          {typeof window !== 'undefined'
            ? document.cookie || 'No cookies'
            : 'Loading...'}
        </pre>
      </div>

      {profile && (
        <div className="mt-4">
          <h2 className="font-bold text-green-600">✅ Authenticated!</h2>
          <pre className="mt-2 rounded bg-green-50 p-2">
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div className="mt-4">
          <h2 className="font-bold text-red-600">❌ Error:</h2>
          <pre className="mt-2 rounded bg-red-50 p-2">{error}</pre>
        </div>
      )}
    </div>
  )
}
