
import express from "express"
import bodyParser from "body-parser"
import initWebRouter from './route/web'
import dotenv from 'dotenv'
import connectDB from './config/connectDB'
import cors from 'cors'

dotenv.config()
let app = express()

const corsOptions = {
    origin: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
initWebRouter(app)
connectDB()
let port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Backend NodeJs running on the port: " + port)
})