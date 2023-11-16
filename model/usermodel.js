const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    UserName : {
        required : true,
        type : String
    },
    Name: {
        required: true,
        type: String
    },
    OrgName : {
        required : true,
        type : String
    },
    Designation : {
        required : true,
        type : String
    },
    Empid: {
        required: false,
        type: String
    },
    DateOfBirth: {
        type: String,
      },
      DateOfJoining: {
        type: String,
      },
    Email: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
    },
    ContactNo: {
        required: true,
        type: Number,
        unique: true,
        length: 10
    },
    Address: {
        required: false,
        type: String
    },
    Pincode: {
        required: true,
        type: Number
    },
    City: {
        required: true,
        type: String
    },
    State: {
        required: true,
        type: String
    },
    BankName: {
        required: true,
        type: String
    },
    Ifsc: {
        required: true,
        type: Number
    },
    AccountNo: {
        required: true,
        type: Number
    },
    Salary: {
        required: true,
        type: Number
    },
    Branch :{
        required : true,
        type : String
    },
    Password:{
        required:false,
        type : String
    },
      Usertype : {
        type : String,
        enum :["Admin","HR","Employee"],
        default : "HR",
        required : true,
      },
      Otp: {
        required: false,
        type: Number
    },
    newpassword : {
        required : false,
        type : String
    },
    Gender : {
        required : true,
        type : String
    },
    
    created_at: {
        type: Date,
        default: Date.now
    },
});

var Signup = (module.exports = mongoose.model("Users", Schema));
module.exports.get = function (callback, limit) {
  Signup.find(callback).limit(limit);
};


