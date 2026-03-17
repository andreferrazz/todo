import { getDb } from '../db.js'
import type { Task } from '../types.js'

export async function getAll(): Promise<Task[]> {
  const result = await getDb().allDocs({ include_docs: true })
  return result.rows
    .filter((row) => row.doc?.type === 'task')
    .map((row) => row.doc as Task)
}

export async function getById(id: string): Promise<Task> {
  return getDb().get(id)
}

export async function save(task: Task): Promise<PouchDB.Core.Response> {
  return getDb().put(task)
}

export async function saveBulk(tasks: Task[]): Promise<Array<PouchDB.Core.Response | PouchDB.Core.Error>> {
  return getDb().bulkDocs(tasks)
}

export function watchChanges(callback: () => void): () => void {
  const listener = getDb()
    .changes({ since: 'now', live: true })
    .on('change', () => callback())
  return () => listener.cancel()
}
