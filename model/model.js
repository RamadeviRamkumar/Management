const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    Empname: {
        required: true,
        type: String
    },
    OrgName : {
        required : true,
        type : String
    },
    Empid: {
        required: false,
        type: String
    },
    Email: {
        type: String,
        required: true,
        // unique: true
    },
    ContactNo: {
        required: true,
        type: Number,
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
    BankBranch :{
        required : true,
        type : String
    },
    Password:{
        required:false,
        type : String
    },
    Usertype : {
        type : String,
        enum :["Admin","Employee"],
        default : "Admin",
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
    created_at: {
        type: Date,
        default: Date.now
    }
});

Schema.path('Email').validate(async function (Email) {
    const emailCount = await mongoose.models.Employee.countDocuments({ Email });
    return !emailCount;
}, 'Email already exists');

var Signup = module.exports = mongoose.model('Employee', Schema);
module.exports.get = function (callback, limit) {
    Signup.find(callback).limit(limit);
};


