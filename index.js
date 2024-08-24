import express from "express"
import connection from "./config/db.js"
import { userRouter } from "./route/user.route.js"
import noteRouter  from "./route/note.route.js"
import auth from './Middleware/auth.middleware.js'
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config()
const app=express()
const PORT=process.env.PORT || 3000
app.use(cors({
    origin:"*"
}))
app.use(express.json())
app.use("/user",userRouter)
app.use("/note",auth,noteRouter)
app.get("/",(req,res)=>{
    return res.send("<h1>server is running</h1>")
})
app.listen(PORT,async()=>{
    try {
        await connection
        console.log("server is running is Port number:",PORT)
    } catch (error) {
        console.log("server is not running in port",error)
    }
})