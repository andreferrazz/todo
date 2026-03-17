import { getAll, getById, save, saveBulk } from '../repository/taskRepository.js'
import type { Task } from '../types.js'

function generateId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export async function getAllTasks(): Promise<Task[]> {
  return getAll()
}

export function filterActive(tasks: Task[]): Task[] {
  return tasks
    .filter((t) => t.status === 'active')
    .sort((a, b) => a.position - b.position)
}

export function filterDotted(tasks: Task[]): Task[] {
  return tasks
    .filter((t) => t.status === 'dotted')
    .sort((a, b) => a.position - b.position)
}

async function getNextPosition(): Promise<number> {
  const tasks = await getAll()
  const positions = tasks.map((t) => t.position)
  return positions.length > 0 ? Math.max(...positions) + 1 : 1
}

function buildTask(text: string, position: number, parentId: string | null = null): Task {
  const now = new Date().toISOString()
  return {
    _id: generateId(),
    type: 'task',
    text,
    position,
    status: 'active',
    dottedAt: null,
    createdAt: now,
    updatedAt: now,
    completedAt: null,
    parentId,
  }
}

export async function addTask(text: string): Promise<PouchDB.Core.Response> {
  const position = await getNextPosition()
  return save(buildTask(text, position))
}

export async function dotTask(id: string): Promise<PouchDB.Core.Response> {
  const task = await getById(id)
  task.status = 'dotted'
  task.dottedAt = new Date().toISOString()
  task.updatedAt = new Date().toISOString()
  return save(task)
}

export async function undotTask(id: string): Promise<PouchDB.Core.Response> {
  const task = await getById(id)
  task.status = 'active'
  task.dottedAt = null
  task.updatedAt = new Date().toISOString()
  return save(task)
}

export async function completeTask(id: string): Promise<PouchDB.Core.Response> {
  const task = await getById(id)
  task.status = 'completed'
  task.completedAt = new Date().toISOString()
  task.updatedAt = new Date().toISOString()
  return save(task)
}

export async function reenterTask(id: string, newText: string): Promise<PouchDB.Core.Response> {
  const original = await getById(id)

  original.status = 'completed'
  original.completedAt = new Date().toISOString()
  original.updatedAt = new Date().toISOString()
  await save(original)

  const position = await getNextPosition()
  return save(buildTask(newText, position, id))
}

export async function rephraseTask(id: string, newText: string): Promise<PouchDB.Core.Response> {
  const task = await getById(id)
  task.text = newText
  task.updatedAt = new Date().toISOString()
  return save(task)
}

export async function deleteTask(id: string): Promise<PouchDB.Core.Response> {
  const task = await getById(id)
  task.status = 'deleted'
  task.updatedAt = new Date().toISOString()
  return save(task)
}

export async function undotAll(): Promise<Array<PouchDB.Core.Response | PouchDB.Core.Error>> {
  const tasks = await getAll()
  const dotted = tasks.filter((t) => t.status === 'dotted')
  const updates = dotted.map((t) => ({
    ...t,
    status: 'active' as const,
    dottedAt: null,
    updatedAt: new Date().toISOString(),
  }))
  return saveBulk(updates)
}
