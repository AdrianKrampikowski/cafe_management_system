const express = require("express")
const connectionDB = require("./dbConnection/db")
const userRoutes = require("./apis/users/index")
const categoryRoutes = require("./apis/categorys/index")
const cors = require("cors")
require("dotenv").config()
const mongodburl = process.env.mongodburl
const portNumber = 8000
// const corsOptions = {
//   origin: 'http://example.com', // specify allowed origin
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//};

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use("/api/user", userRoutes)
app.use("/api/category", categoryRoutes)


const start = async () => {
    try {
        await connectionDB(mongodburl)
        app.listen(portNumber, () => {
            console.log(`localhost:${portNumber} is live`);
        })
    } catch (error) {
        console.error("Error", error.message);
    }
}

start()