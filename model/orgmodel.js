const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    
    OrgName : {
        required : true,
        type : String
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
    Password : {
        required : false,
        type : String
    },
});

const OrgDetails = mongoose.model("OrgDetails",OrganizationSchema)

module.exports = OrgDetails;
  
    