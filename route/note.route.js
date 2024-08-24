import express from 'express'
import { noteModel}  from '../Model/note.model.js'
const noteRouter=express.Router()
noteRouter.post("/create",async(req,res)=>{
 const {title,content,status}=req.body
 const UserId=req.user._id
 if (!UserId) {
    return res.status(401).json({ msg: 'Unauthorized: User not authenticated.' });
  }
 try {
    const note= new noteModel({
        title,
        content,
        status,
        UserId
    });
    await note.save();
    res.status(201).json({"msg":"note create successfully"})
 } catch (error) {
    res.status(400).json({"msg":"note not create successfully",error})
 }
})
noteRouter.get("/",async(req,res)=>{
    const UserId=req.user._id
    try {
        const notes=await noteModel.find({UserId})
        res.status(201).json({notes})
        
    } catch (error) {
        res.status(500).json({"msg":"Error while fetching notes",error})
    }
})
noteRouter.patch("/update/:id",async(req,res)=>{
 const payload=req.body
 const noteId=req.params.id
 const UserId=req.user._id

    try {
        const notes=await noteModel.findOne({_id:noteId})
        if(notes.UserId.toString()==UserId.toString()){
            await noteModel.findByIdAndUpdate({_id:noteId},payload)
          return  res.status(201).json({msg:"note update successfully"})
        }else{
            return res.status(401).json({message:"unauthorized"})
        }
        
    } catch (error) {
        res.status(500).json({"msg":"Error while updating notes",error})
    }
})
noteRouter.delete("/delete/:id",async(req,res)=>{
    const payload=req.body
    const noteId=req.params.id
    const UserId=req.user._id
       try {
           const notes=await noteModel.findOne({_id:noteId})
           if(notes.UserId.toString()==UserId.toString()){
               await noteModel.findByIdAndDelete({_id:noteId},payload)
             return  res.status(201).json({msg:"note delete successfully"})
           }else{
               return res.status(401).json({message:"unauthorized"})
           }
       } catch (error) {
           res.status(500).json({"msg":"Error while deleting notes",error})
       }
   })

export default noteRouter