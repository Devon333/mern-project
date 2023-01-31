var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('API is working properly!');
});
router.get('/test', (req, res)=>{
  res.send('API test is working properly!');
});

module.exports = router;
