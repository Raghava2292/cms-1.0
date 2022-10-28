const route = require('express').Router();
const userController = require('../controller/userController');

route.get(`/allUsers`, userController.getAll)
route.get(`/currentUser`, userController.getCurrentUser)

route.patch(`/update/:id`, userController.updateUser)
route.delete(`/delete/:id`, userController.deleteUser)

route.patch(`/changeRole/:id`, userController.changeRole)

module.exports = route