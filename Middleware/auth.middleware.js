import jwt from 'jsonwebtoken'
import { userModel } from '../Model/user.model.js'
const auth=async(req,res,next)=>{
    if(!req.headers.authorization){
        res.status(501).json({msg:"Token not found"})
    }
const token=req.headers.authorization.split(" ")[1]
if(!token){
    return res.status(401).json({msg:"token not found"})
}
try {
    const decoded=jwt.verify(token,process.env.jwt_secret_key1)
    if(!decoded){
        return  res.status(401).json({msg:"Invalid Token please login again"})
    }
    const user= await userModel.findById(decoded.id)
    req.user=user
    next()
} catch (error) {
    res.status(401).json({msg:"invalid token"})
}
}
export default auth