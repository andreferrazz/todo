import { startSync } from './db.js'
import { getSession, getRemoteDbUrl } from './auth.js'
import { refresh } from './taskStore.svelte.js'
import type { SyncStatus } from './types.js'

let status: SyncStatus = $state('local')

export function getSyncStatus(): SyncStatus {
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
