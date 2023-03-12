var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const app= express()
app.use(express.json());
const {MongoClient} = require('mongodb');
const config = require('config');
const dbConfig = config.get('hack.dbConfig.dbName');
const {connectToDb, getDb} = require('../db.js');
require("../models/newUser")
const User = mongoose.model("userInfo");


async function readUsers(req,res){
    
  let users=[];
    const client = await new MongoClient(dbConfig);//"mongodb+srv://hack:hack1@cluster0.2o7ugk3.mongodb.net/?retryWrites=true&w=majority");
    const cursor = await client.db('database').collection('users').find({"user":"user1","password":"password"});
    const result = await cursor.toArray();
    console.log(result);
    try{
    result.forEach(user => users.push(user))
    res.status(200).json(users)
        }catch(error){
          res.status(500).json({error:"could not fetch documents"})
        }
    client.close();
}



router.get("/",async(req,res)=>{
  readUsers(req,res)
});

async function createUser(req,res){
    console.log(req.body.name)
    console.log(req.body.user)
    console.log(req.body.password)
    const client = await new MongoClient(dbConfig);//"mongodb+srv://hack:hack1@cluster0.2o7ugk3.mongodb.net/?retryWrites=true&w=majority");
    const result = await client.db('database').collection('users').insertOne({"name":req.body.name, "user":req.body.user,"password":req.body.password,});
    console.log(`New listing created with following id: ${result.insertedId}`);
    client.close();
}

router.post("/",async(req,res)=>{
  createUser(req,res); 
});



module.exports = router;
