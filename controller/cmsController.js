const asyncHandler = require('express-async-handler')
const Cms = require('../models/Cms')

exports.getCms = asyncHandler(async (req, res) => {
    const result = await Cms.find()
    res.status(200).json({ message: "Cms Fetch Success", result })
})  