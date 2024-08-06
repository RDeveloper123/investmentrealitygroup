const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    price: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    preselection: {
        type: String,
        enum: ["residential", "row-house", "villa", "commercial"]
    },
    propertyStatus: {
        type: String,
        enum: ["pre-launch", "launch", "under-construction", "nearby-possession", "ready-to-move", "substainence"],
        required: true
    },
    propertyType: {
        type: String,
        enum: ["1bhk", "1.5bhk", "2bhk", "2.5bhk", "3bhk", "3.5bhk", "4bhk", "simplex", "duplex", "row-House", "villa"],
        required: true
    },
    image: {
        type: [String],
    },
    video: {
        type: String,
        default: null
    }

}, { timestamps: true })
module.exports = mongoose.model('property', propertySchema)