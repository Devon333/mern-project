var express = require('express');
var router = express.Router();

const {MongoClient} = require('mongodb');
const config = require('config');
const dbConfig = config.get('hack.dbConfig.dbName');

async function readExams(res){
    let data=[];
    const client = new MongoClient("mongodb+srv://hack:hack1@cluster0.2o7ugk3.mongodb.net/?retryWrites=true&w=majority");
    const cursor = await client.db('database').collection('exams').find();
    const result = await cursor.toArray();
    if (result.length > 0 ){
      result.forEach((resu,i)=>{
        data.push({"id":resu._id,
                      "patientId":resu.PATIENT_ID,
                      "age":resu.AGE,
                      "sex":resu.SEX,
                      "zip":resu.ZIP,
                      "latest bmi":resu["LATEST_BMI"],
                      "latest weight":resu["LATEST WEIGHT"],
                      "filename":"https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/"+resu["png_filename"],
                      "examId":resu["exam_Id"],
                      "ICU Admit":resu["ICU Admit"],
                      "#ICU Admits":resu["# ICU admits"],
                      "Mortality":resu["MORTALITY"]
                     })
      })  
    }else{console.log('no data');}
    console.log(data.length);
    res.send(data);
  }

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('API is working properly!');
});

router.get('/exams',function(req,res){
  //res.send("test")
  const dat = readExams(res)
});

module.exports = router;
