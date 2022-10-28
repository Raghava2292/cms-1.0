const route = require('express').Router();
const authController = require('../controller/authController');


route.post(`/register`, authController.register)
route.post(`/login`, authController.login)

route.get(`/logout`, authController.logout)
route.get(`/refresh-token`, authController.refreshToken)

route.patch(`/reset-password/:id`, authController.resetPassword)

module.exports = route