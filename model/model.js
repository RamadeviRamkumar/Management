var mongoose = require('mongoose');

var Schema = mongoose.Schema({
  Name: {
    required: true,
    type: String,
  },
  Id:{
    required : false,
    type : String,
  },
  Gender : {
    required : true,
    type : String,
  },
  DOB : {
    required : true,
    type : Number,
  },
  DOJ : {
    required : true,
    type : Number,
  },
  Address : {
    required : true,
    type : String,
  },
  DepartmentNo :{
    required : true,
    type : Number,
  },
  Empemail: {
    required: true,
    type: String,
  },
  Phonenumber: {
    required: true,
    type: Number,
  }, 
  Password: {
    required: false,
    type: String,
  },
  Designation :{
    required : false,
    type : String,
  },
  Salary : {
    required : true,
    type : Number,
  },
  Usertype : {
    type : String,
    enum :["Admin","Employee"],
    default : "Admin",
    required : true,
  },
created_at: {
    type: Date,
    default: Date.now,
  },
});

// Schema.path("Empemail").validate(async (Empemail) => {
//   const emailCount = await mongoose.models.Details.countDocuments({ Empemail });
//   return !emailCount;
// }, "Empemail already exists");

var Signup = (module.exports = mongoose.model("Details", Schema));
module.exports.get = function (callback, limit) {
  Signup.find(callback).limit(limit);
};
