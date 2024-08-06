const jwt = require("jsonwebtoken")

exports.adminProtected = (req, res, next) => {
    const admin = req.cookies.admin
    if (!admin) {
        return res.status(401).json({ message: "No cookie found" })
    }
    jwt.verify(admin, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(500).json({ message: err.message || "Invalid Token" })
        }
        req.user = decode.userId
        next()
    })

}
exports.userProtected = (req, res, next) => {
    const user = req.cookies.user
    if (!user) {
        return res.status(401).json({ message: "No cookie found" })
    }
    jwt.verify(user, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(500).json({ message: err.message || "Invalid Token" })
        }
        req.user = decode.userId
        next()
    })

}