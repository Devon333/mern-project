var express = require('express');
const mongo = require('mongodb');
const app= express()
app.use(express.json());
var router = express.Router();

const {MongoClient} = require('mongodb');
const config = require('config');
const dbConfig = config.get('hack.dbConfig.dbName');

async function insertExam(req,res){
  const client = new MongoClient(dbConfig);
  const result = await client.db('database').collection('exams').insertOne(req.body);
  console.log(`New listing id: ${result.insertedId}`)
  client.close();
}

async function updateOneExam(client,PID,EID,UE){ 
    const result = await client.db('database').collection('exams').updateOne({"PATIENT_ID":PID,"exam_Id":EID},{$set:UE})
    console.log(`${result.matchedCount} document(s) matched querey`)
    console.log(`${result.modifiedCount} documents were updataed`)
}

async function updateExams(req,res){
    const client = new MongoClient(dbConfig);//"mongodb+srv://hack:hack1@cluster0.2o7ugk3.mongodb.net/?retryWrites=true&w=majority");
    console.log(typeof req.body)
    const prop1=["PATIENT_ID","AGE","SEX","ZIP","LATEST_BMI","exam_Id","ICU Admit","MORTALITY","KEY_FINDINGS"]
    await prop1.forEach((prop)=>{
      if(req.body[prop] !== undefined){
        let PID = req.body['PATIENT_ID']
        let EID = req.body['exam_Id']
        console.log(`${prop} is defined: ${req.body[prop]}, EID:${EID}, PID:${PID}`)
        //client.connect();
        const val= {[prop]:req.body[prop]}
        console.log(val);
        updateOneExam(client,PID,EID,val);
        }else{console.log(`${prop} is not defined`)}
      })
    console.log("finished loop");
    await client.close();
  }


async function readExams(req,res){
    let data=[];
    const client = new MongoClient(dbConfig);//"mongodb+srv://hack:hack1@cluster0.2o7ugk3.mongodb.net/?retryWrites=true&w=majority");
    const cursor = await client.db('database').collection('exams').find({"PATIENT_ID":req.params.patientID});
    const result = await cursor.toArray();
    if (result.length > 0 ){
      result.forEach((resu,i)=>{
        data.push({"id":resu._id,
                      "patientId":resu.PATIENT_ID,
                      "age":resu.AGE,
                      "sex":resu.SEX,
                      "zip":resu.ZIP,
                      "LATEST_BMI":resu["LATEST_BMI"],
                      "latest weight":resu["LATEST WEIGHT"],
                      "filename":"https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/"+resu["png_filename"],
                      "examId":resu["exam_Id"],
                      "ICU Admit":resu["ICU Admit"],
                      "#ICU Admits":resu["# ICU admits"],
                      "Mortality":resu["MORTALITY"],
                      "KEY_FINDINGS":resu["KEY_FINDINGS"],
                     })
      })  
    }else{console.log('no data');}
    client.close();
    console.log(data.length);
    res.send(data);
  }

async function deletePatient(req, res) {

  const client = new MongoClient(dbConfig);
  const { id } = req.params;

  try {
    //await client.connect();

    const result = await client
      .db('database')
      .collection('exams')
      .deleteOne({ '_id': new mongo.ObjectId(id) });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  } finally {
    await client.close();
  }
}


//Route to delete a patient
router.delete('/:patientID/:id',function(req,res){
  deletePatient(req,res)
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('API is working properly!');
});

router.get('/:patientID',function(req,res){
  //res.send("test")
  const dat = readExams(req,res);
});

router.post('/updateExam',async function(req,res){
  console.log(req.body);
  await updateExams(req,res);
});

router.post('/insertExam',async function(req,res){
  console.log(req.body);
  await insertExam(req,res);
});

module.exports = router;
