import { getDb } from './db.js'
import {
  getAllTasks,
  getActiveTasks,
  getDottedTasks,
  addTask,
  dotTask,
  undotTask,
  completeTask,
  reenterTask,
  rephraseTask,
  deleteTask,
  undotAll as undotAllTasks,
} from './tasks.js'
import type { Task } from './types.js'

let allTasks: Task[] = $state([])
let changesListener: PouchDB.Core.Changes<Task> | null = null

const activeTasks = $derived(getActiveTasks(allTasks))
const dottedTasks = $derived(getDottedTasks(allTasks))

export function getActiveTasksList(): Task[] {
  return activeTasks
}

export function getDottedTasksList(): Task[] {
  return dottedTasks
}

export async function refresh() {
  allTasks = await getAllTasks()
}

export async function add(text: string) {
  await addTask(text)
}

export async function dot(id: string) {
  await dotTask(id)
}

export async function undot(id: string) {
  await undotTask(id)
}

export async function complete(id: string) {
  await completeTask(id)
}

export async function reenter(id: string, newText: string) {
  await reenterTask(id, newText)
}

export async function rephrase(id: string, newText: string) {
  await rephraseTask(id, newText)
}

export async function remove(id: string) {
  await deleteTask(id)
}

export async function undotAll() {
  await undotAllTasks()
}

export function startListening() {
  stopListening()
  changesListener = getDb()
    .changes({ since: 'now', live: true })
    .on('change', () => refresh())
  return changesListener
}

export function stopListening() {
  if (changesListener) {
    changesListener.cancel()
    changesListener = null
  }
}
