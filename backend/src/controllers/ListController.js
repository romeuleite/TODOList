const crypto = require('crypto');
const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const lists = await connection('lists').select('*')

    return response.json(lists)
  },

  async create(request, response) {
    const { name, completed } = request.body

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('lists').insert({
      id,
      name,
      completed
    })

    return response.json({ id })
  },

  async delete(request, response) {
    const { id } = request.params

    const list = await connection('lists')
      .where('id', id)
      .first()

    await connection('lists').where('id', id).delete()

    return response.status(204).send()
  },

  async update(request, response) {
    const { id } = request.params
    const { completed } = request.body

    const list = await connection('lists')
      .where('id', id)

    if (!list) {
      return response.status(400).json({ error: 'list does not exists.' })
    }

    await connection('lists').where('id', id).update({
      completed
    })

    return response.status(204).send()
  }
}