const authController = require('../controller/authController')
const router = require('express').Router()

router
    .post('/register-admin', authController.registerAdmin)
    .post('/login-admin', authController.loginAdmin)
    .post('/logout-admin', authController.logoutAdmin)

    .post('/register-user', authController.registerUser)
    .post('/login-user', authController.loginUser)
    // .post('/otp-verify', authController.verifyUserOtp)
    .post('/logout-user', authController.logoutUser)

module.exports = router
