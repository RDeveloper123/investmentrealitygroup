const adminController = require('../controller/adminController')
const router = require('express').Router();

router

    .get('/get-property', adminController.getProperty)
    .get('/getAll-property', adminController.getAllProperty)


module.exports = router;