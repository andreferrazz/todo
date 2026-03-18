import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import PouchDB from 'pouchdb'
import memoryAdapter from 'pouchdb-adapter-memory'
import { setDb } from '../../src/lib/db.js'
import type { Task } from '../../src/lib/types.js'
import {
  getAllTasks,
  filterActive,
  filterDotted,
  addTask,
  dotTask,
  undotTask,
  completeTask,
  reenterTask,
  rephraseTask,
  deleteTask,
  undotAll,
} from '../../src/lib/services/taskService.js'

PouchDB.plugin(memoryAdapter)

let testDb: PouchDB.Database<Task>

beforeEach(() => {
  testDb = new PouchDB(`test-${Date.now()}-${Math.random()}`, { adapter: 'memory' })
  setDb(testDb)
})

afterEach(async () => {
  await testDb.destroy()
})

describe('addTask', () => {
  it('creates a task with correct shape', async () => {
    await addTask('Buy groceries')
    const tasks = await getAllTasks()

    expect(tasks).toHaveLength(1)
    expect(tasks[0]).toMatchObject({
      type: 'task',
      text: 'Buy groceries',
      position: 1,
      status: 'active',
      dottedAt: null,
      completedAt: null,
      parentId: null,
    })
    expect(tasks[0]._id).toMatch(/^task_[0-9a-f-]{36}$/)
    expect(tasks[0].createdAt).toBeTruthy()
    expect(tasks[0].updatedAt).toBeTruthy()
  })

  it('assigns incrementing positions', async () => {
    await addTask('Task 1')
    await addTask('Task 2')
    await addTask('Task 3')
    const tasks = await getAllTasks()
    const positions = tasks.map((t) => t.position).sort()
    expect(positions).toEqual([1, 2, 3])
  })
})

describe('filterActive', () => {
  it('filters and sorts by position', async () => {
    await addTask('Task A')
    await addTask('Task B')
    await addTask('Task C')
    const all = await getAllTasks()

    // Dot one to make sure it's excluded
    await dotTask(all.find((t) => t.text === 'Task B')!._id)

    const refreshed = await getAllTasks()
    const active = filterActive(refreshed)

    expect(active).toHaveLength(2)
    expect(active[0].text).toBe('Task A')
    expect(active[1].text).toBe('Task C')
    expect(active[0].position).toBeLessThan(active[1].position)
  })
})

describe('filterDotted', () => {
  it('filters dotted tasks and sorts by position', async () => {
    await addTask('Task A')
    await addTask('Task B')
    const all = await getAllTasks()

    await dotTask(all[0]._id)
    await dotTask(all[1]._id)

    const refreshed = await getAllTasks()
    const dotted = filterDotted(refreshed)

    expect(dotted).toHaveLength(2)
    expect(dotted[0].position).toBeLessThan(dotted[1].position)
  })
})

describe('dotTask', () => {
  it('sets status to dotted and records timestamp', async () => {
    await addTask('Test task')
    const tasks = await getAllTasks()
    await dotTask(tasks[0]._id)

    const refreshed = await getAllTasks()
    expect(refreshed[0].status).toBe('dotted')
    expect(refreshed[0].dottedAt).toBeTruthy()
  })
})

describe('undotTask', () => {
  it('resets status to active and clears dottedAt', async () => {
    await addTask('Test task')
    const tasks = await getAllTasks()
    await dotTask(tasks[0]._id)
    await undotTask(tasks[0]._id)

    const refreshed = await getAllTasks()
    expect(refreshed[0].status).toBe('active')
    expect(refreshed[0].dottedAt).toBeNull()
  })
})

describe('completeTask', () => {
  it('sets status to completed and records timestamp', async () => {
    await addTask('Test task')
    const tasks = await getAllTasks()
    await completeTask(tasks[0]._id)

    const refreshed = await getAllTasks()
    expect(refreshed[0].status).toBe('completed')
    expect(refreshed[0].completedAt).toBeTruthy()
  })
})

describe('reenterTask', () => {
  it('completes original and creates new task with parentId', async () => {
    await addTask('Original task')
    const tasks = await getAllTasks()
    const originalId = tasks[0]._id

    await reenterTask(originalId, 'Rephrased task')

    const refreshed = await getAllTasks()
    const original = refreshed.find((t) => t._id === originalId)!
    const newTask = refreshed.find((t) => t._id !== originalId)!

    expect(original.status).toBe('completed')
    expect(original.completedAt).toBeTruthy()

    expect(newTask.text).toBe('Rephrased task')
    expect(newTask.status).toBe('active')
    expect(newTask.parentId).toBe(originalId)
    expect(newTask.position).toBeGreaterThan(original.position)
  })
})

describe('rephraseTask', () => {
  it('updates text and preserves other fields', async () => {
    await addTask('Original text')
    const tasks = await getAllTasks()
    const task = tasks[0]

    await rephraseTask(task._id, 'New text')

    const refreshed = await getAllTasks()
    expect(refreshed[0].text).toBe('New text')
    expect(refreshed[0].status).toBe('active')
    expect(refreshed[0].position).toBe(task.position)
  })
})

describe('deleteTask', () => {
  it('soft deletes by setting status to deleted', async () => {
    await addTask('Test task')
    const tasks = await getAllTasks()
    await deleteTask(tasks[0]._id)

    const refreshed = await getAllTasks()
    expect(refreshed[0].status).toBe('deleted')
  })
})

describe('undotAll', () => {
  it('resets all dotted tasks to active', async () => {
    await addTask('Task A')
    await addTask('Task B')
    await addTask('Task C')
    const tasks = await getAllTasks()

    await dotTask(tasks[0]._id)
    await dotTask(tasks[1]._id)

    await undotAll()

    const refreshed = await getAllTasks()
    const dotted = filterDotted(refreshed)
    const active = filterActive(refreshed)

    expect(dotted).toHaveLength(0)
    expect(active).toHaveLength(3)
  })
})
