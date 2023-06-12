const moongoose = require("mongoose")

const userSchema= moongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    password:{
        type: String,
        required: [true, "password is required"],
      },
      
    isDealer:{
    type: Boolean,
    default: false
    },
})

const userModel = moongoose.model("user", userSchema)

module.exports= userModel