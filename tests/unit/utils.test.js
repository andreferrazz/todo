import { describe, it, expect } from 'vitest'
import { generateId } from '../../src/lib/utils.js'

describe('generateId', () => {
  it('returns a string starting with task_', () => {
    const id = generateId()
    expect(id).toMatch(/^task_/)
  })

  it('generates unique IDs', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()))
    expect(ids.size).toBe(100)
  })
})
