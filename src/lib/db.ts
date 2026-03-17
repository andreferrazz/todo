import PouchDB from 'pouchdb'
import type { Task } from './types.js'

let db: PouchDB.Database<Task> = new PouchDB('rezero')
let syncHandler: PouchDB.Replication.Sync<any> | null = null

export function getDb(): PouchDB.Database<Task> {
  return db
}

export function setDb(newDb: PouchDB.Database<Task>) {
  db = newDb
}

interface SyncCallbacks {
  onChange?: () => void
  onPaused?: () => void
  onError?: (err: Error) => void
}

export function startSync(remoteUrl: string, { onChange, onPaused, onError }: SyncCallbacks) {
  stopSync()

  syncHandler = db.sync(remoteUrl, { live: true, retry: true })
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
