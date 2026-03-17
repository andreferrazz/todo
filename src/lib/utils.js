export function generateId() {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}
