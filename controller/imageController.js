const cloudinary = require('cloudinary');
const fs = require('fs');
const { StatusCodes } = require('http-status-codes');


cloudinary.config({
    cloud_name: "dizyeasx0",
    api_key: "485625588749936",
    api_secret: "wrLyfR_ppT7okj-C74ZbbwS-SG4"
})

//to remove temp file
const removeTemp = (path) => {
    fs.unlinkSync(path)
}

const imageController = {
    uploadProfileImage: async (req, res) => {
        try {
            if(!req.files || Object.keys(req.files).length === 0)
                return res.status(StatusCodes.BAD_REQUEST).json({msg: "No files were attached"})

            const file = req.files.profileImg

                //validate file size
                if(file.size > 1 * 1024 * 1024) {
                    removeTemp(file.tempFilePath)
                    return res.status(StatusCodes.BAD_REQUEST).json({msg: 'File size must be less than 1MB'})
                }

                //validate image type
                if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
                    removeTemp(file.tempFilePath)
                    return res.status(StatusCodes.BAD_REQUEST).json({msg: "Only use jpg & png format images"})
                }

                //upload logic
                await cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "profile_image"}, (err, result) => {
                    if(err) res.status(StatusCodes.BAD_REQUEST).json({msg: err.message})
                        removeTemp(file.tempFilePath)
                    return res.status(StatusCodes.OK).json({
                        public_id: result.public_id,
                        url: result.secure_url
                    })
                })
            // res.json({file})
            // res.json({msg: "upload profile image"})
        } catch(err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    },
    deleteProfileImage: async(req, res) => {
        try{
            const {public_id} = req.body

            if(!public_id)
                return res.status(StatusCodes.NOT_FOUND).json({msg: "No public id found"})
            
            await cloudinary.v2.uploader.destroy(public_id, (err, result) => {
                if(err)
                    return res.status(StatusCodes.BAD_REQUEST).json({msg: err.message})
                res.status(StatusCodes.OK).json({msg: "Image successfully deleted"})
            })
            // res.json({msg: "delete profile image"})
        } catch(err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }
}

module.exports = imageController