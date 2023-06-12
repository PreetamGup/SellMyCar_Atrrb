const mongoose = require("mongoose")

const Oem_SpecsSchema= mongoose.Schema({
    model:{
        type: String,
        required: [true, "Model is required"],
    },

    yearOfModel:{
        type: Number,
        required: [true, "Year of model is required"],
    },

    listPriceOfNewVehicle:{
        type: Number,
        required:[true, "list of price is required"],
    },

    availableColors:{
        type:[String],
        required:[true, "Color is required"]
    },

    mileage:{
        type:Number,
        required:[true,'Mileage is required']
    },

    power:{
        type:Number,
        required:[true,'Power(in BHP) is required']
    },

    maxSpeed:{
        type:Number,
        required:[true,'Maximum Speed is required']
    }, 
   

})

const oem_Model = mongoose.model('oemspecs', Oem_SpecsSchema);

module.exports = oem_Model;