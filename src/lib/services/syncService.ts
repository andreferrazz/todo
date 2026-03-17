import { getDb } from '../db.js'
import { getSession, getRemoteDbUrl } from '../auth.js'
import type { SyncStatus } from '../types.js'

let syncHandler: PouchDB.Replication.Sync<any> | null = null

export function startSync(remoteUrl: string, callbacks: SyncCallbacks) {
  stopSync()
  const { onChange, onPaused, onError } = callbacks

  syncHandler = getDb().sync(remoteUrl, { live: true, retry: true })
    .on('change', () => onChange?.())
    .on('paused', () => onPaused?.())
    .on('active', () => onChange?.())
    .on('error', (err: {}) => onError?.(err as Error))

  return syncHandler
}

export function stopSync() {
  if (syncHandler) {
    syncHandler.cancel()
    syncHandler = null
  }
}

interface SyncCallbacks {
  onChange?: () => void
  onPaused?: () => void
  onError?: (err: Error) => void
}

export async function initSync(
  onStatusChange: (status: SyncStatus) => void,
  onRemoteChange: () => void,
) {
  const session = await getSession()
  if (!session) {
    onStatusChange('local')
    return
  }

  const remoteUrl = getRemoteDbUrl(session.name)
  startSync(remoteUrl, {
    onChange: () => {
      onStatusChange('syncing')
      onRemoteChange()
    },
    onPaused: () => {
      onStatusChange('synced')
    },
    onError: () => {
      onStatusChange('offline')
    },
  })
  onStatusChange('synced')
}
