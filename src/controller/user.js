import mongodb,{ MongoClient } from 'mongodb'
import { ObjectId } from 'bson';

import DBconfig from '../config/DBconfig.js'

const client = new MongoClient(DBconfig.DB_URL)

const getAllUsers = async(req,res)=>{
    await client.connect()
    try {
        const DB = await client.db(DBconfig.DB_NAME)
        let users = await DB.collection('user').find().toArray()
        res.status(200).send({
            message:"user data fetched successfully",
            users
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "internal server error"
        })
    }
    finally{
     client.close()
    }
}
const getuserById = async(req,res)=>{
    await client.connect()
    try {
        const DB = await client.db(DBconfig.DB_NAME)
        // const objectid = new ObjectId(req.params.id);
        let userid = await DB.collection('user').findOne({_id: new mongodb.ObjectId(req.params.id).toHexString()})
        console.log(userid)
        res.status(200).send({
            message:"user data fetched successfully",
            userid
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "internal server error"
        })
    }
    finally{
     client.close()
    }
}


const createUser =async(req,res)=>{
    await client.connect()
    try {
        const DB = await client.db(DBconfig.DB_NAME)
        let user = await DB.collection('user').findOne({email:req.body.email})
        if(!user){
            await DB.collection('user').insertOne(req.body)
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
    finally{
     client.close()
    }
}

const editUserById = async(req,res)=>{
    await client.connect()
    try {
        const DB = await client.db(DBconfig.DB_NAME)
        let user = await DB.collection('user').findOne({_id: new mongodb.ObjectId(req.params.id)})
        if(user){
           await DB.collection('user').updateOne({_id: new mongodb.ObjectId(req.params.id)}, {$set:req.body})
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
       

}  catch (error) {
        res.status(500).send({
            message:error.message || "internal server error"
        })
    }
    finally{
        client.close()
       }
}

const deleteUserById = async(req,res)=>{
    await client.connect()
    try {
            const DB = await client.db(DBconfig.DB_NAME)
            const objectid= new mongodb.ObjectId(req.params.id)
            let user = await DB.collection('user').findOne({_id: objectid})
            if(user){
               await DB.collection('user').deleteOne({_id: objectid})
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
    finally{
        client.close()
       }
}

export default {
    getAllUsers,
    createUser,
    getuserById,
    editUserById,
    deleteUserById
}