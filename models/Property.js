const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    
    price: {
        type: String,
        required: true
    },
    budget:{
        type:String,
        enum:["52lakh to 60lakh","1cr to 2cr","2cr"]
    },
    city: {
        type: String,
       
    },
    landmark: {
        type: String,
    },
    desc: {
        type: String,
        required: true
    },
    preselection: {
        type: String,
    },
    propertyStatus: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        required: true
    },
    type:{
        type:String,
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