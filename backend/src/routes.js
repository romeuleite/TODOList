const express = require('express');

const TaskController = require('./controllers/TaskController');
const ListController = require('./controllers/ListController');
const ListTasksController = require('./controllers/ListTasksController')

const routes = express.Router();

routes.get('/lists', ListController.index);
routes.post('/lists', ListController.create);
routes.delete('/lists/:id', ListController.delete);

routes.get('/listtasks', ListTasksController.index);

routes.get('/tasks', TaskController.index);
routes.post('/tasks', TaskController.create);
routes.delete('/tasks/:id', TaskController.delete);

module.exports = routes;