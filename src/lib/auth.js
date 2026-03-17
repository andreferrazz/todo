const COUCHDB_URL = import.meta.env.VITE_COUCHDB_URL || 'http://localhost:5984'

export async function login(username, password) {
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

export async function logout() {
  await fetch(`${COUCHDB_URL}/_session`, {
    method: 'DELETE',
    credentials: 'include',
  })
}

export async function getSession() {
  try {
    const res = await fetch(`${COUCHDB_URL}/_session`, {
      credentials: 'include',
    })
    const data = await res.json()
    if (data.userCtx?.name) {
      return data.userCtx
    }
    return null
  } catch {
    return null
  }
}

export function getRemoteDbUrl(username) {
  return `${COUCHDB_URL}/rezero_${username}`
}
