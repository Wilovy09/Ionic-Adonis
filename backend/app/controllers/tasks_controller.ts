import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'

export default class TasksController {
  // GET all task from where user_id its the same of requested /tasks
  async get({ auth }: HttpContext) {
    const user_id = auth.user?.id as number
    if (!user_id) return new Error('User not found')
    const tasks = await Task.query().where('owner_id', user_id).exec()
    return tasks
  }

  // GET /tasks/:id
  async find({ auth, request }: HttpContext) {
    const { id } = request.params()
    const task = await Task.findOrFail(id)
    return task
  }

  // POST /tasks
  async create({ auth, request }: HttpContext) {
    const user_id = auth.user?.id as number
    if (!user_id) return new Error('User not found')
    const data = request.only(['owner_id', 'title', 'content', 'isComplete'])
    const task = await Task.create(data)
    return task
  }

  // DELETE /tasks/:id
  async delete({ auth, request }: HttpContext) {
    const { id } = request.params()
    const task = await Task.findOrFail(id)
    await task.delete()
    return { message: 'success' }
  }

  // PUT /tasks/:id
  async update({ auth, request }: HttpContext) {
    const { id } = request.params()
    const data = request.only(['title', 'content', 'isComplete'])
    const task = await Task.findOrFail(id)
    task.merge(data)
    await task.save()
    return task
  }
}
