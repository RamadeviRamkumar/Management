const mongoose = require('mongoose');

const OrgSchema = new mongoose.Schema({
    
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

var Organization = (module.exports = mongoose.model("OrgDetails", OrgSchema));
module.exports.get = function (callback, limit) {
  Organization.find(callback).limit(limit);
};
// module.exports = OrgDetails;
  
    