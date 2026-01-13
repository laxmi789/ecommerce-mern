const userModel = require('../../models/web/user.js')

const userList = async (req, res) => {
    try {
        const data = await userModel.find()
        console.log(data)
        res.status(200).json({ msg: "All users fetch", data })
    } catch (error) {
        console.log(error)
    }
}

module.exports = userList