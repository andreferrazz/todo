import { getDb } from './db.js'
import { generateId } from './utils.js'

export async function getAllTasks() {
  const result = await getDb().allDocs({ include_docs: true })
  return result.rows
    .map((row) => row.doc)
    .filter((doc) => doc.type === 'task')
}

export function getActiveTasks(tasks) {
  return tasks
    .filter((t) => t.status === 'active')
    .sort((a, b) => a.position - b.position)
}

export function getDottedTasks(tasks) {
  return tasks
    .filter((t) => t.status === 'dotted')
    .sort((a, b) => a.position - b.position)
}

async function getNextPosition() {
  const tasks = await getAllTasks()
  const positions = tasks.map((t) => t.position)
  return positions.length > 0 ? Math.max(...positions) + 1 : 1
}

export async function addTask(text) {
  const position = await getNextPosition()
  const task = {
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

export async function dotTask(id) {
  const task = await getDb().get(id)
  task.status = 'dotted'
  task.dottedAt = new Date().toISOString()
  task.updatedAt = new Date().toISOString()
  return getDb().put(task)
}

export async function undotTask(id) {
  const task = await getDb().get(id)
  task.status = 'active'
  task.dottedAt = null
  task.updatedAt = new Date().toISOString()
  return getDb().put(task)
}

export async function completeTask(id) {
  const task = await getDb().get(id)
  task.status = 'completed'
  task.completedAt = new Date().toISOString()
  task.updatedAt = new Date().toISOString()
  return getDb().put(task)
}

export async function reenterTask(id, newText) {
  const original = await getDb().get(id)

  original.status = 'completed'
  original.completedAt = new Date().toISOString()
  original.updatedAt = new Date().toISOString()
  await getDb().put(original)

  const position = await getNextPosition()
  const newTask = {
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

export async function rephraseTask(id, newText) {
  const task = await getDb().get(id)
  task.text = newText
  task.updatedAt = new Date().toISOString()
  return getDb().put(task)
}

export async function deleteTask(id) {
  const task = await getDb().get(id)
  task.status = 'deleted'
  task.updatedAt = new Date().toISOString()
  return getDb().put(task)
}

export async function undotAll() {
  const tasks = await getAllTasks()
  const dotted = tasks.filter((t) => t.status === 'dotted')
  const updates = dotted.map((t) => ({
    ...t,
    status: 'active',
    dottedAt: null,
    updatedAt: new Date().toISOString(),
  }))
  return getDb().bulkDocs(updates)
}
