import { getDb } from './db.js'
import { generateId } from './utils.js'
import type { Task } from './types.js'

export async function getAllTasks(): Promise<Task[]> {
  const result = await getDb().allDocs({ include_docs: true })
  return result.rows
    .filter((row) => row.doc?.type === 'task')
    .map((row) => row.doc as Task)
}

export function getActiveTasks(tasks: Task[]): Task[] {
  return tasks
    .filter((t) => t.status === 'active')
    .sort((a, b) => a.position - b.position)
}

export function getDottedTasks(tasks: Task[]): Task[] {
  return tasks
    .filter((t) => t.status === 'dotted')
    .sort((a, b) => a.position - b.position)
}

async function getNextPosition(): Promise<number> {
  const tasks = await getAllTasks()
  const positions = tasks.map((t) => t.position)
  return positions.length > 0 ? Math.max(...positions) + 1 : 1
}

export async function addTask(text: string): Promise<PouchDB.Core.Response> {
  const position = await getNextPosition()
  const task: Task = {
    _id: generateId(),
    type: 'task',
    text,
    position,
    status: 'active',
    dottedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null,
    parentId: null,
  }
  return getDb().put(task)
}

export async function dotTask(id: string): Promise<PouchDB.Core.Response> {
  const task = await getDb().get(id)
  task.status = 'dotted'
  task.dottedAt = new Date().toISOString()
  task.updatedAt = new Date().toISOString()
  return getDb().put(task)
}

export async function undotTask(id: string): Promise<PouchDB.Core.Response> {
  const task = await getDb().get(id)
  task.status = 'active'
  task.dottedAt = null
  task.updatedAt = new Date().toISOString()
  return getDb().put(task)
}

export async function completeTask(id: string): Promise<PouchDB.Core.Response> {
  const task = await getDb().get(id)
  task.status = 'completed'
  task.completedAt = new Date().toISOString()
  task.updatedAt = new Date().toISOString()
  return getDb().put(task)
}

export async function reenterTask(id: string, newText: string): Promise<PouchDB.Core.Response> {
  const original = await getDb().get(id)

  original.status = 'completed'
  original.completedAt = new Date().toISOString()
  original.updatedAt = new Date().toISOString()
  await getDb().put(original)

  const position = await getNextPosition()
  const newTask: Task = {
    _id: generateId(),
    type: 'task',
    text: newText,
    position,
    status: 'active',
    dottedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null,
    parentId: id,
  }
  return getDb().put(newTask)
}

export async function rephraseTask(id: string, newText: string): Promise<PouchDB.Core.Response> {
  const task = await getDb().get(id)
  task.text = newText
  task.updatedAt = new Date().toISOString()
  return getDb().put(task)
}

export async function deleteTask(id: string): Promise<PouchDB.Core.Response> {
  const task = await getDb().get(id)
  task.status = 'deleted'
  task.updatedAt = new Date().toISOString()
  return getDb().put(task)
}

export async function undotAll(): Promise<Array<PouchDB.Core.Response | PouchDB.Core.Error>> {
  const tasks = await getAllTasks()
  const dotted = tasks.filter((t) => t.status === 'dotted')
  const updates = dotted.map((t) => ({
    ...t,
    status: 'active' as const,
    dottedAt: null,
    updatedAt: new Date().toISOString(),
  }))
  return getDb().bulkDocs(updates)
}
