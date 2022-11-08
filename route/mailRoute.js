const route = require('express').Router();

const mailController = require('../controller/mailController');

route.post(`/sendMail`, mailController.sendMail)

module.exports = route