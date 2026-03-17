import { startSync } from './db.js'
import { getSession, getRemoteDbUrl } from './auth.js'
import { refresh } from './taskStore.svelte.js'

let status = $state('local')

export function getSyncStatus() {
  return status
}

export async function initSync() {
  const session = await getSession()
  if (!session) {
    status = 'local'
    return
  }

  const remoteUrl = getRemoteDbUrl(session.name)
  startSync(remoteUrl, {
    onChange: () => {
      status = 'syncing'
      refresh()
    },
    onPaused: () => {
      status = 'synced'
    },
    onError: () => {
      status = 'offline'
    },
  })
  status = 'synced'
}
