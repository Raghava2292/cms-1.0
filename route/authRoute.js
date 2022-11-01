const route = require('express').Router();
const authController = require('../controller/authController');
const auth = require('../middleware/auth');


route.post(`/register`, authController.register)
route.post(`/login`, authController.login)

route.get(`/logout`, authController.logout)
route.get(`/refreshToken`, authController.refreshToken)

route.patch(`/reset-password`, auth, authController.resetPassword)

module.exports = route