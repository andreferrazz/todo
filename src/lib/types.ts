export type TaskStatus = 'active' | 'dotted' | 'completed' | 'deleted'

export interface Task {
  _id: string
  _rev?: string
  type: 'task'
  text: string
  position: number
  status: TaskStatus
  dottedAt: string | null
  createdAt: string
  updatedAt: string
  completedAt: string | null
  parentId: string | null
}

export type SyncStatus = 'local' | 'syncing' | 'synced' | 'offline'

export interface UserCtx {
  name: string
  roles: string[]
}
