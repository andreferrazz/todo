import type { UserCtx } from './types.js'

const COUCHDB_URL = import.meta.env.VITE_COUCHDB_URL || 'http://localhost:5984'

export async function login(username: string, password: string): Promise<{ ok: boolean; name: string; roles: string[] }> {
  const res = await fetch(`${COUCHDB_URL}/_session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name: username, password }),
  })

  if (!res.ok) {
    throw new Error('Invalid credentials')
  }

  return await res.json()
}

export async function logout(): Promise<void> {
  await fetch(`${COUCHDB_URL}/_session`, {
    method: 'DELETE',
    credentials: 'include',
  })
}

export async function getSession(): Promise<UserCtx | null> {
  try {
    const res = await fetch(`${COUCHDB_URL}/_session`, {
      credentials: 'include',
    })
    const data = (await res.json()) as { userCtx: UserCtx }
    if (data.userCtx?.name) {
      return data.userCtx
    }
    return null
  } catch {
    return null
  }
}

export function getRemoteDbUrl(username: string): string {
  return `${COUCHDB_URL}/rezero_${username}`
}
