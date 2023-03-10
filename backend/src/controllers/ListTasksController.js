const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const list_id = request.headers.authorization;

        const tasks = await connection('tasks')
            .where('list_id', list_id)
            .select('*');

        return response.json(tasks);
    }
}