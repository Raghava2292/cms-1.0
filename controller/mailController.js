const { StatusCodes } = require('http-status-codes');
const sendMail = require('../middleware/mail');

const mailController = {
    sendMail: async (req, res) => {
        try {
            const {to, subject, content} = req.body

            const result = await sendMail(to, subject, content)

            res.json({result})
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }
}

module.exports = mailController