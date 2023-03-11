var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const app= express()
app.use(express.json());
const {MongoClient} = require('mongodb');
const config = require('config');
const dbConfig = config.get('hack.dbConfig.dbName');


async function checkLogin(req,res){
    
  let users=[];
    const client = await new MongoClient(dbConfig);//"mongodb+srv://hack:hack1@cluster0.2o7ugk3.mongodb.net/?retryWrites=true&w=majority");
    const cursor = await client.db('database').collection('users').find({"user":req.body.user,"password":req.body.password});
    const result = await cursor.toArray();
    if(result.length>0 && 
       result[0].user==req.body.user && 
       result[0].password == req.body.password){
       console.log(result);
       res.status(200).json({admin:true, login:true, user:req.body.user, name:result[0].name})
        
       } else{
              res.status(200).json({login:false});
              }
        //.forEach(user => users.push(user))
        //res.status(200).json(users)
         //}//catch(error){
          // res.status(500).json({error:"could not fetch documents"})
          //}
  client.close();  
}

async function loginCheck(req,res){  
  let users=[];
    const client = await new MongoClient(dbConfig);//"mongodb+srv://hack:hack1@cluster0.2o7ugk3.mongodb.net/?retryWrites=true&w=majority");
    const cursor = await client.db('database').collection('users').find({"user":req.body.user,"password":req.body.password});
    const result = await cursor.toArray();
    if(result.length>0){
      console.log(result);
      try{
        //result.forEach(user => users.push(user))
        if(result[0].user==req.body.user && result[0].password == req.body.password){
          res.status(200).json({login:true, user:req.body.user,name:result[0].name})
        }
        //.forEach(user => users.push(user))
        //res.status(200).json(users)
         }catch(error){
           res.status(500).json({error:"could not fetch documents"})
         }
    }
  client.close();
}




async function createUser(req,res){
    console.log(req.body.name)
    console.log(req.body.user)
    console.log(req.body.password)
    const client = await new MongoClient(dbConfig);//"mongodb+srv://hack:hack1@cluster0.2o7ugk3.mongodb.net/?retryWrites=true&w=majority");
    const result = await client.db('database').collection('users').insertOne({"name":req.body.name, "user":req.body.user,"password":req.body.password,});
    console.log(`New listing created with following id: ${result.insertedId}`);
    client.close();
}

router.post("/admin",async(req,res)=>{
  checkLogin(req,res); 
});
router.post("/",async(req,res)=>{
  checkLogin(req,res); 
});

router.get("/",async(req,res)=>{
  loginCheck(req,res)
});


module.exports = router;

