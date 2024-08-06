const { default: mongoose } = require("mongoose");


const propertystatusShema = new mongoose.Schema({
    propertystatus: {
        type: String,
        required: true,
    },
    active: { type: Boolean, default: true },


}, { timestamps: true });
module.exports = mongoose.model('propertyStatus', propertystatusShema);