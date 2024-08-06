const mongoose = require('mongoose')

const CmsSchema = new mongoose.Schema({
    brandname: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    socialMediaLinks: {
        type: String,
        default: true
    },

}, { timestamps: true })
module.exports = mongoose.model("cms", CmsSchema)