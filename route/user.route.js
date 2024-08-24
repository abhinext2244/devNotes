import express from 'express'
import bcrypt from 'bcrypt'
import { userModel } from '../Model/user.model.js'
import jwt from 'jsonwebtoken'
const userRouter=express.Router()
userRouter.post("/register",async(req,res)=>{
    const {name,password,email,age,gender}=req.body
    try {
        bcrypt.hash(password, 5, async function(err, hash) {
            if(err){
               return res.status(500).json({"msg":"internal server error"})
            }
            const user= new userModel({
                name,
                password:hash,
                email,
                age,
                gender
            });
            await user.save()
            res.status(201).json({"msg":"user create successfully"})
        })
    } catch (error) {
        res.status(500).json({"msg":"user not create successfully"})
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModel.findOne({email})
        if(!user){
           return res.status(500).json({msg:"user not found"})
        }
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
              if(err){
                res.status(500).json({msg:"internal server error"})
              }
              if(result){
               const token= jwt.sign({id:user._id},process.env.jwt_secret_key1)
               res.status(200).json({msg:"user login successfully",token})
              }else{
                res.status(500).json({msg:"wrong password"})
              }
            });
        }

    } catch (error) {
        res.status(500).json({"msg":"error during occure login"})
    }
})
export {userRouter}