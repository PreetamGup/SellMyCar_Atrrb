const router= require("express").Router()
const authMiddleware = require("../middlewares/authMiddleware") 
const {allCarDetails, oemController, addSecondhandCar, deleteSecondhandCar,updateSecondhandCar, oemAllData, carByDealers} = require('../controllers/carController')


router.get("/allcardetails", authMiddleware,allCarDetails)
router.get("/carsbydealers",authMiddleware, carByDealers)
router.post("/addCarDetails",authMiddleware, addSecondhandCar)
router.put('/updatecardetails',authMiddleware, updateSecondhandCar)
router.delete('/removecar/:carId',authMiddleware, deleteSecondhandCar)

router.post("/oemspecs", oemController)
router.get("/oemspecs", oemAllData)




module.exports= router