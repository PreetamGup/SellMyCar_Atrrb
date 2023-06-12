const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDb = require("./config/connectDB")
const logger = require("morgan")

const app= express();


//For env file
dotenv.config();

//connect to Db
connectDb()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())


app.use('/api/user', require('./routes/userRoutes'));
app.use("/api/car", require("./routes/carRoutes") )

const Port = process.env.PORT || 5050

app.listen(Port,()=>{
    console.log(`Server is listening on Port ${Port}`)
})