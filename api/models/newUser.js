const mongoose = require("mongoose");

const NewUserSchema = new mongoose.Schema({
  name:String,
  user:String,
  password:String,
});


module.exports = mongoose.model("userInfo",NewUserSchema);
