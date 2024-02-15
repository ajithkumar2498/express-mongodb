// import mongodb,{ MongoClient } from 'mongodb'
import dotenv from 'dotenv';
import userModel from '../model/user.js';
dotenv.config()
// const client = new MongoClient(process.env.DB_URL)

const getAllUsers = async(req,res)=>{
   
    try {
        // const DB = await client.db(process.env.DB_NAME)
        let users = await userModel.find()
        res.status(200).send({
            message:"user data fetched successfully",
            users
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "internal server error"
        })
    }
   
}
const getuserById = async(req,res)=>{
   
    try {
        
        // const objectid = new ObjectId(req.params.id);
        const user = await userModel.findOne({_id: req.params.id})
        console.log(user)
        res.status(200).send({
            message:"user data fetched successfully",
            user
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "internal server error"
        })
    }
  
}


const createUser =async(req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email})
        if(!user){
            await userModel.create(req.body)
            res.status(201).send({
                message:"user created successfully"
            })
        }else{
            res.status(400).send({
                message:`user with ${req.body.email} already exist`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "internal server error"
        })
    }
  
}

const editUserById = async(req,res)=>{
   
    try {
       
        let user = await userModel.findOne({_id: req.params.id})
        if(user){
            user.name = req.body.name
            user.email = req.body.email
            user.password = req.body.password
            user.status = req.body.status
            user.role = req.body.role
            
           await user.save()
           res.status(200).send({
            message:"user edited successfully",
            user
        })
        }
        else{
            res.status(400).send({
                message:"User Not Found"
            })
        }
       

}  catch (error) {
        res.status(500).send({
            message:error.message || "internal server error"
        })
    }
    
}

const deleteUserById = async(req,res)=>{
   
    try {
            
            let user = await userModel.findOne({_id: req.params.id})
            if(user){
               await userModel.deleteOne({_id: req.params.id})
               res.status(200).send({
                message:"user deleted successfully",
                user
            })
            }
            else{
                res.status(400).send({
                    message:"User Not Found"
                })
            }
           
    
    } catch (error) {
        res.status(500).send({
            message:error.message || "internal server error"
        })
    }
  
}

export default {
    getAllUsers,
    createUser,
    getuserById,
    editUserById,
    deleteUserById
}