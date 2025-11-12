import { getAll, getOne, save } from '$lib/todoRepository.js';

export async function load({  }) {

    return {
        todos: await getAll()
    }

}

export const actions = {
    create: async ({request}) => {
        const formData = await request.formData()

        const todo = {
            displayText: formData.get('displayText')?.toString().trim() || null,
            everyDay: (formData.get('everyDay') || null) === 'true',
            today: (formData.get('today') || null) === 'true',
            checked: false,
            createdAt: new Date(),
            updatedAt: null,
            checkedAt: null
        }

        const id = await save(todo)

        return {
            todo: await getOne(id)
        }
    }
}