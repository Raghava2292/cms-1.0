const { StatusCodes } = require("http-status-codes")
const User = require('../model/userModel');
const bcrypt = require('bcryptjs');

const authController = {
    register: async (req, res) => {
        try {
            const {name, email, mobile, password} = req.body

            const encPassword = await bcrypt.hash(password, 10)

            const newUser = await User.create({
                name, 
                email,
                mobile,
                password: encPassword
            })
            res.status(StatusCodes.OK).json({msg: "User registerd successfully", data: newUser})
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            res.json({msg: "login"})
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    },
    logout: async (erq, res) => {
        try {
            res.json({msg: "logout"})
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    },
    refreshToken: async (req, res) => {
        try {
            res.json({msg: "refreshToken"})
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    },
    resetPassword: async (req, res) => {
        try {
            res.json({msg: "resetPassword"})
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }
}

module.exports = authController