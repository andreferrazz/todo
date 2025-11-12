import { getAll, getOne, save, update } from '$lib/todoRepository.js';
import { fail } from '@sveltejs/kit';

export async function load({ }) {

    return {
        todos: await getAll()
    }

}

export const actions = {
    create: async ({ request }) => {
        const formData = await request.formData()

        const todo = {
            displayText: formData.get('displayText')?.toString().trim() || null,
            everyDay: (formData.get('everyDay') || null) === 'true',
            today: (formData.get('today') || null) === 'true',
            checked: false,
            deleted: false,
            createdAt: new Date(),
            updatedAt: null,
            checkedAt: null
        }

        const id = await save(todo)

        return {
            todo: await getOne(id)
        }
    },
    check: async ({ request }) => {
        const formData = await request.formData()

        const id = formData.get('id')?.toString().trim() || null
        const checked = formData.has('checked')

        if (!id) {
            return fail(500, { error: 'Something got wrong' })
        }

        const todo = await getOne(id)

        if (!todo) {
            return fail(404, { error: 'Todo not found' })
        }

        todo.checked = checked
        todo.checkedAt = new Date()

        await update(todo)
    }
}