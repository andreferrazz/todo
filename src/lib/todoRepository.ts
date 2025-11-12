import { MONGODB_DATABASE } from "$env/static/private";
import { ObjectId, type Document, type WithId } from "mongodb";
import { client } from "./mongodb";
import type { Todo } from "./todo";

const COLLECTION = 'todos'

export async function save(todo: any) {
    return client
        .db(MONGODB_DATABASE)
        .collection(COLLECTION)
        .insertOne(todo)
        .then(result => result.insertedId.toString())
}

export async function update(todo: Todo) {
    return client
        .db(MONGODB_DATABASE)
        .collection(COLLECTION)
        .updateOne(
            { _id: new ObjectId(todo._id) },
            {
                $set: {
                    displayText: todo.displayText,
                    everyDay: todo.everyDay,
                    today: todo.today,
                    checked: todo.checked,
                    deleted: todo.deleted,
                    checkedAt: todo.checkedAt,
                    updatedAt: new Date(),
                }
            }
        )
        .then(result => result.acknowledged)
}

export async function getAll() {
    return client
        .db(MONGODB_DATABASE)
        .collection(COLLECTION)
        .find({})
        .toArray()
        .then(documents => documents.map(fromDocument) as Todo[])
}

export async function getOne(_id: string) {
    return client
        .db(MONGODB_DATABASE)
        .collection(COLLECTION)
        .findOne({ _id: new ObjectId(_id) })
        .then(fromDocument)
}

function fromDocument(document: WithId<Document> | null) {
    if (!document) {
        return null;
    }
    return { ...document, _id: document._id.toString() } as Todo
}