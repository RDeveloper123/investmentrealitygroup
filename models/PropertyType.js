const { default: mongoose } = require("mongoose");


const typeShema = new mongoose.Schema({

    type: {
        type: String,
        required: true,
    },
    active: { type: Boolean, default: true },


}, { timestamps: true });
module.exports = mongoose.model('type', typeShema); 