const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    
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

    Schema.path('Email').validate(async function (Email) {
        const emailCount = await mongoose.models.Orgdetails.countDocuments({ Email });
        return !emailCount;
    }, 'Email already exists');
    
    var Organization = module.exports = mongoose.model('Orgdetails', Schema);
    module.exports.get = function (callback, limit) {
        Organization.find(callback).limit(limit);
    };
    