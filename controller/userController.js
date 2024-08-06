const  asyncHandler=require('express-async-handler')
const Property = require('../models/Property')

exports.getProperty = asyncHandler(async (req, res) => {
    const result = await Property.find()
    res.json({ message: "Property Fetch Successfully", result })
})