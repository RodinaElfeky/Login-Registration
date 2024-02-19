import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import {connection} from './DB/connection.js'
import { authRouter,userRouter } from './Modules/index.routes.js'
const app = express()


app.use(express.json())
connection()
app.use(`${process.env.BASE_URL}/user`,userRouter)
app.use(`${process.env.BASE_URL}/auth`,authRouter)

app.get("*", (req,res)  => {
    res.json({message:"invalid API"})
})



app.listen(3000 , () =>{
    console.log("server is Running")
})