const { StatusCodes } = require("http-status-codes")
const User = require('../model/userModel');


const adminAuth = async (req, res, next) => {
    try {
        const id = req.user.id

        const extUser = await User.findById({_id:id})

        //validate role
        if(extUser.role !== "superadmin")
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "Access denied for non-admin users"})
        
        next()
        
        // res.json({adminAuth: extUser})
        // res.json({adminAuth: req.user})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
    }
}

module.exports = adminAuth