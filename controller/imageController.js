const cloudinary = require('cloudinary');
const fs = require('fs');
const { StatusCodes } = require('http-status-codes');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const imageController = {
    uploadProfileImage: async(req, res) => {
        try {
            res.json({msg: "upload profile image"})
        } catch(err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    },
    deleteProfileImage: async(req, res) => {
        try{
            res.json({msg: "delete profile image"})
        } catch(err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }
}

module.exports = imageController