const { StatusCodes } = require("http-status-codes")


const adminAuth = async (req, res, next) => {
    try {

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
    }
}

module.exports = adminAuth