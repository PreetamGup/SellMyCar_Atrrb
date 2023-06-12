const CarInventory = require('../models/MarketPlace_InventoryModel')
const OemModel = require("../models/OEM_Spec")
const jwt = require("jsonwebtoken")



const allCarDetails=async(req, res)=>{   
  
    try {
        const allCar= await CarInventory.find({}).populate("oem")
        return res.json({
            status:true,
            allCar
        })
    } catch (error) {
        console.log(error.message)
        return res.json({
            status:false,
            message:"Something went wrong"
        })
    }
}

const oemController = async(req, res)=>{

    try {
        const OemData = new OemModel(req.body)
        await OemData.save()
        return  res.json({
            success: true,
            OemData
        })
    } catch (error) {
        console.log(error.message)
        return  res.json({
            success: false,
            message: "Oem data not added"
        })
    }
   
   
}


const oemAllData= async(req, res)=>{
    try {
        const allOemCars= await OemModel.find({})
        return res.json({
            status:true,
            allOemCars
        })
    } catch (error) {
        console.log(error.message)
        return res.json({
            status:false,
            message:"Something went wrong"
        })
    }
}

const addSecondhandCar =async(req, res)=>{
    
    try {
        const token = req.body.token
       jwt.verify(token,process.env.JWT_SECRET,async(err,decode)=>{
           if(err){
            return res.status(200).send({
                message:`No token found in add Form`,
                success:false
            })
           }else{
            req.body.userId = decode.id
            req.body.oem=req.body.oem_id

            const newCarData= new CarInventory(req.body)
            await newCarData.save();
    
            return res.status(201).json({
                success:true,
                message : "Data saved succefully"
           })

           }
        })

    } catch (error) {
        console.log(error)
    
    }
}

const carByDealers=(req, res)=>{

    try {
        const token = req.headers['authorization'].split(" ")[1];
       jwt.verify(token,process.env.JWT_SECRET,async(err,decode)=>{
           if(err){
            return res.status(200).send({
                message:`No token found in add Form`,
                success:false
            })
           }else{
            
                const allCarsByDealer= await CarInventory.find({userId:decode.id})
                return res.status(201).json({
                    success:true,
                    allCarsByDealer
                })

           }
        })

    } catch (error) {
        console.log(error)
    
    }

}

const updateSecondhandCar= async(req, res)=>{

    try {
        const carId= req.body._id

        await CarInventory.updateOne({_id:carId}, {...req.body})


      return res.status(200).json({
            success:true,
            message:"Updated Succefully"
        })
    } 
    catch (error) {
        console.log(error.message)
    }
}

const deleteSecondhandCar= async(req, res)=>{

    try {
        const carId= req.params.carId
        console.log(carId)
        const response= await CarInventory.deleteOne({_id:carId})
        console.log(response)
        return res.status(200).json({
            response
        })
      
    } 
    catch (error) {
        console.log(error)
    }

}


module.exports ={allCarDetails, oemController, addSecondhandCar, updateSecondhandCar, deleteSecondhandCar, oemAllData, carByDealers}