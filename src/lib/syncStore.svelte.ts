import { initSync } from './services/syncService.js'
import { refresh } from './taskStore.svelte.js'
import type { SyncStatus } from './types.js'

let status: SyncStatus = $state('local')

export function getSyncStatus(): SyncStatus {
  return status
}

export async function startSync() {
  await initSync(
    (newStatus) => { status = newStatus },
    () => refresh(),
  )
}
