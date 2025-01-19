const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');
const contactRoutes = require('./contacts');
 
routes.get('/', lesson1Controller.ogRoute);
routes.get('/hello', lesson1Controller.helloRoute);

routes.use('/contacts', contactRoutes);


module.exports = routes;