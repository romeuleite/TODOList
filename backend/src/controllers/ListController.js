const crypto = require('crypto');
const connection  = require('../database/connection')

module.exports = {
  async index(request, response) {
  const lists = await connection('lists').select('*')

  return response.json(lists)
 },

  async create(request, response) {
    const { name } = request.body

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('lists').insert({
      id,
      name
    })

    return response.json({ id })
  }
}