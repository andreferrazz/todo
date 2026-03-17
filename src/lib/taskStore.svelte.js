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

let allTasks = $state([])
let changesListener = null

const activeTasks = $derived(getActiveTasks(allTasks))
const dottedTasks = $derived(getDottedTasks(allTasks))

export function getActiveTasksList() {
  return activeTasks
}

export function getDottedTasksList() {
  return dottedTasks
}

export async function refresh() {
  allTasks = await getAllTasks()
}

export async function add(text) {
  await addTask(text)
}

export async function dot(id) {
  await dotTask(id)
}

export async function undot(id) {
  await undotTask(id)
}

export async function complete(id) {
  await completeTask(id)
}

export async function reenter(id, newText) {
  await reenterTask(id, newText)
}

export async function rephrase(id, newText) {
  await rephraseTask(id, newText)
}

export async function remove(id) {
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
