const mongoose = require('mongoose');


const inventorySchema = new mongoose.Schema({
    km:{
        type:Number,
    },
    majorScratches:{
        type:String
    },

    originalPaint:{
        type:String
    },

    noOfAccidentsReported:{
        type:Number
    },

    noOfPreviousBuyers:{
        type:Number
    },

    registrationPlace:{
        type:String
    },

    title:{
        type:String,
        required: true,
    },

    image:{
        type:String,
        default:"https://t4.ftcdn.net/jpg/03/32/56/67/360_F_332566713_q0QLBQ0BWkG5ed7DGRiuFIjvZNwEL9k2.jpg"
    },

    description:{
        type:String,
        required:true
    },


    userId:{
        type:String,

    },
    
    oem_id:{
        type:String,
    }
    ,
    
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    },
    
    oem:{type: mongoose.Schema.Types.ObjectId, ref: 'oemspecs'}
});

const inventoryModel = mongoose.model('inventory', inventorySchema );

module.exports = inventoryModel;