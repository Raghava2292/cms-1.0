const route = require('express').Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const userAuth = require('../middleware/userAuth');

//admin auth
route.get(`/allUsers`, auth, adminAuth, userController.getAll)
route.delete(`/delete/:id`, auth, adminAuth, userController.deleteUser)
route.patch(`/changeRole/:id`, userController.changeRole)

//user auth
route.get(`/currentUser`, auth, userController.getCurrentUser)
route.patch(`/update`, auth, userAuth, userController.updateUser)


module.exports = route