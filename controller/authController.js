const { StatusCodes } = require("http-status-codes")
const User = require('../model/userModel');
const bcrypt = require('bcryptjs'); // default imports - can be assigned to another variable
const { createAccessToken } = require('../util/token'); //with curly braces - constant or named imports - cannot be assigned to another variable
const jwt = require('jsonwebtoken');
const regTemplate = require('../template/regTemplate');
const sendMail = require('../middleware/mail');

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
            const template = regTemplate(name, email)
            const subject = `Confirmation of registration with CMS-v1.0`

            await sendMail(email, subject, template)

             res.status(StatusCodes.OK).json({msg: "User registerd successfully", data: newUser})
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body

            // user email exists or not
            const extUser = await User.findOne({email})
                if(!extUser)
                    return res.status(StatusCodes.NOT_FOUND).json({msg: "User doesn't exist"})
            
            //validate the password
            const isMatch = await bcrypt.compare(password, extUser.password)
                if (!isMatch)
                    return res.status(StatusCodes.BAD_REQUEST).json({msg: "passwords are not matching"})
            
            // generate token
            const accessToken = createAccessToken({_id: extUser._id})

            //save token in cookies
            res.cookie('refreshToken', accessToken, {
                httpOnly: true,
                signed: true, 
                path: `/api/v1/auth/refreshToken`,
                maxAge: 1*24*60*60*1000
            })

            res.json({msg: "Login Successfull", accessToken})
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshToken', {path: `/api/v1/auth/refreshToken`})

            res.json({msg: "logout successful"})
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    },
    refreshToken: async (req, res) => {
        try {
            const rf = req.signedCookies.refreshToken

            if(!rf)
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "Session expired. Login again"})
            
            jwt.verify(rf, process.env.TOKEN_SECRET, (err, user) => {
                if (err)
                    return res.status(StatusCodes.BAD_REQUEST).json({msg: "Invalid Access Token. Login Again"})

                //valid token
                    const accessToken = createAccessToken({ id: user._id})
                res.json({accessToken})
            })
            
            // res.json({ rf })
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    },
    resetPassword: async (req, res) => {
        try {
            const id = req.user.id
            const {oldPassword, newPassword} = req.body
            // read user data
            const extUser = await User.findById({_id: id})
                if(!extUser)
                    return res.status(StatusCodes.NOT_FOUND).json({msg: "user doesn't exist"})
            
            //compare password
            const isMatch = await bcrypt.compare(oldPassword, extUser.password)
                if (!isMatch)
                    return res.status(StatusCodes.BAD_REQUEST).json({msg: " old passwords are not matching"})
            // generate newPassword hash
            const passwordHash = await bcrypt.hash(newPassword, 10)

            //update logic
            const output = await User.findByIdAndUpdate({_id: id}, {password: passwordHash})
            //output response
            res.json({msg: "user password reset success", output})
            res.json({passwordHash})
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }
}

module.exports = authController