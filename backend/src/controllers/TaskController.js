const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query

    const [count] = await connection('tasks').count()

    const tasks = await connection('tasks')
      .join('lists', 'lists.id', '=', 'tasks.list_id')
      .limit(5)
      .offset((page - 1) * 5 )
      .select([
        'tasks.*',
        'lists.name'
      ])

    response.header('X-Total-Count', count['count(*)'])

    return response.json(tasks)
  },

  async create(request, response) {
    const { title, completed} = request.body
    const list_id = request.headers.authorization

    const [id] = await connection('tasks').insert({
      title,
      completed,
      list_id,
    })

    return response.json({ id })
  },

  async delete(request, response) {
    const { id } = request.params
    const list_id = request.headers.authorization

    const task = await connection('tasks')
      .where('id', id)
      .select('list_id')
      .first()

    if (task.list_id != list_id) {
      return response.status(401).json({ error: 'Operation not permitted.' })
    }

    await connection('tasks').where('id', id).delete()

    return response.status(204).send()
  },

  async update(request, response) {
    const { id } = request.params
    const { completed} = request.body

    const task = await connection('tasks')
      .where('id', id)

    if (!task) {
      return response.status(400).json({ error: 'Task does not exists.' })
    }

    await connection('tasks').where('id', id).update({
      completed
    })

    return response.status(204).send()
  }
}