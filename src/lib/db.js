import PouchDB from 'pouchdb'

let db = new PouchDB('rezero')
let syncHandler = null

export function getDb() {
  return db
}

export function setDb(newDb) {
  db = newDb
}

export function startSync(remoteUrl, { onChange, onPaused, onError }) {
  stopSync()

  syncHandler = db.sync(remoteUrl, { live: true, retry: true })
    .on('change', () => onChange?.())
    .on('paused', () => onPaused?.())
    .on('active', () => onChange?.())
    .on('error', (err) => onError?.(err))

  return syncHandler
}

export function stopSync() {
  if (syncHandler) {
    syncHandler.cancel()
    syncHandler = null
  }
}
