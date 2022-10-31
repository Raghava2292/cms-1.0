const route = require('express').Router();
const authController = require('../controller/authController');


route.post(`/register`, authController.register)
route.post(`/login`, authController.login)

route.get(`/logout`, authController.logout)
route.get(`/refreshToken`, authController.refreshToken)

route.patch(`/resetPassword/:id`, authController.resetPassword)

module.exports = route