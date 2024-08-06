const asyncHandler = require('express-async-handler');
const { checkEmpty } = require('../utils/handleEmpty');
const validator = require('validator');
const Admin = require('../models/Admin');
const User = require('../models/User');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const { isError, error } = checkEmpty({ name, email, password });
    if (isError) {
        return res.status(400).json({ message: "All Fields are required", error });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" });
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Please Provide Strong Password " });
    }
    const found = await Admin.findOne({ email })
    if (found) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const hash = await bcrypt.hash(password, 10)
    await Admin.create({ name, email, password: hash })
    res.status(201).json({ message: "Admin Created Successfully" });
})
exports.loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const { isError, error } = checkEmpty({ email, password })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: `Invalid Email` })
    }

    const found = await Admin.findOne({ email })
    if (!found) {
        return res.status(401).json({ message: "Eamil Not Registered with us" })
    }

    const verify = await bcrypt.compare(password, found.password)
    if (!verify) {
        return res.status(401).json({ message: "Password Do Not Match" })
    }

    const token = jwt.sign({ userId: found._id }, process.env.JWT_KEY)
    res.cookie("admin", token, { httpOnly: true })

    res.json({
        message: "Admin Login Success", result: {
            _id: found._id,
            name: found.name,
            email: found.email,
        }
    })

})
exports.logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("admin")
    res.json({ message: "Admin Logout Success" })
})

exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, mobile, address } = req.body;
    const { isError, error } = checkEmpty({ name, email, password, mobile, address });
    if (isError) {
        return res.status(400).json({ message: "All Fields are required", error });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" });
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Please Provide Strong Password " });
    }
    if (!validator.isMobilePhone(mobile, ['en-IN'])) {
        return res.status(400).json({ error: `Invalid Mobile Number` })
    }

    const found = await User.findOne({ $or: [{ email }, { mobile }] })
    if (found) {
        return res.status(400).json({ message: "Email or mobile already exists" });
    }
    const hash = await bcrypt.hash(password, 10)
    await User.create({ name, email, password: hash, mobile, address })
    res.status(201).json({ message: "User Created Successfully" });
})

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const { isError, error } = checkEmpty({ email, password })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }
   
    const found = await User.findOne({ email })
    if (!found) {   
        return res.status(401).json({ message: "email Not Registered with us" })
    }
    const verify = await bcrypt.compare(password, found.password)
    if (!verify) {
        return res.status(401).json({ message: "Password Do Not Match" })
    }
    const token = jwt.sign({ userId: found._id }, process.env.JWT_KEY)
    res.cookie("user", token, { httpOnly: true })
    res.json({
        message: "User Login Success", result: {
            _id: found._id,
            name: found.name,
            email: found.email,
        }
    })
    // send email aur otp logic
    res.json({ message: "User Login Success" })
})

// exports.verifyUserOtp = asyncHandler(async (req, res) => {
//     const { otp, mobile } = req.body
//     const { isError, error } = checkEmpty({ otp, mobile })
//     if (isError) {
//         return res.status(400).json({ message: "Provide OTP and Mobile number", error })
//     }
//     if (!validator.isMobilePhone(mobile, "en-IN")) {
//         return res.status(400).json({ error: `Invalid Mobile` })
//     }
//     const isFound = await User.findOne({ mobile })
//     if (!isFound) {
//         return res.status(401).json({ message: "mobile Not Registered with us" })
//     }
//     if (isFound.otpExpire < new Date(Date.now())) {
//         await User.findByIdAndUpdate(isFound._id, { otp: "" })
//         return res.status(400).json({ message: "OTP Expired. Login Again" })
//     }
//     if (isFound.otp !== otp) {
//         return res.status(401).json({ message: "Invalid OTP" })
//     }
//     await User.findByIdAndUpdate(isFound._id, { otp: "" })

//     const token = jwt.sign({ userId: isFound._id }, process.env.JWT_KEY)
//     res.cookie("user", token, { httpOnly: true })
//     res.json({
//         message: "User Login Success", result: {
//             _id: isFound._id,
//             name: isFound.name,
//             email: isFound.email,
//         }
//     })

// })

exports.logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("user")
    res.json({ message: "User Logout Success" })
})