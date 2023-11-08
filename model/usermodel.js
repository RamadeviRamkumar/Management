const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    Username : {
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
    DOB: {
        type: String,
      },
      Dateofjoining: {
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
    // Pincode: {
    //     required: true,
    //     type: Number
    // },
    // City: {
    //     required: true,
    //     type: String
    // },
    // State: {
    //     required: true,
    //     type: String
    // },
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
    PaymentMethod : {
        required : true,
        type : String
    },
    Status : {
        required : true,
        type : String
    },
    Usertype : {
        type : String,
        enum :["Admin","Employee"],
        default : "Employee",
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

const EmployeeDetails = mongoose.model("EmployeeDetails",EmployeeSchema)

module.exports = EmployeeDetails;
