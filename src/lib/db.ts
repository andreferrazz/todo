import PouchDB from 'pouchdb'
import type { Task } from './types.js'

let db: PouchDB.Database<Task> = new PouchDB('rezero')

export function getDb(): PouchDB.Database<Task> {
  return db
}

export function setDb(newDb: PouchDB.Database<Task>) {
  db = newDb
}
