
export type Todo = {
    _id: string
    displayText: string
    checked: boolean,
    everyDay: boolean,
    today: boolean,
    createdAt: Date,
    updatedAt: Date,
    checkedAt: Date,
    deleted: boolean,
}