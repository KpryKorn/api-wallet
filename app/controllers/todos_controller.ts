import type { HttpContext } from '@adonisjs/core/http'
import Todo from '../models/todo.js'

export default class TodosController {
  public async index({ request }: HttpContext) {
    // returns all todos from the database
    const todos = await Todo.query()
    return todos
  }

  public async show({ request, params }: HttpContext) {
    // returns a single todo from the database
    try {
      const todo = await Todo.find(params.id)
      if (todo) return todo
    } catch (error) {
      console.log(error)
    }
  }

  public async update({ auth, request, params }: HttpContext) {
    // updates the values of each column in the db
    const todo = await Todo.find(params.id)
    if (todo) {
      todo.title = request.input('title')
      todo.desc = request.input('desc')
      todo.isCompleted = request.input('isCompleted')
      if (await todo.save()) {
        return todo
      }
      return // 422
    }
    return // 401
  }

  public async store({ auth, request, response }: HttpContext) {
    // creates a new todo in the database
    const todo = new Todo()
    todo.title = request.input('title')
    todo.desc = request.input('desc')
    await todo.save()
    return todo
  }

  public async destroy({ auth, request, response, params }: HttpContext) {
    // deletes a todo from the database
    const todo = await Todo.query().where('id', params.id).delete()
    return response.json({ message: 'Deleted todo successfully' })
  }
}
