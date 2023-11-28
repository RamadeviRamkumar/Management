const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  entry: {
    type: Date,
  },
  UserName: {
    type : String,
      },
  exit: {
    time: {
      type: Date,
    },
    reason: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

var attendance = (module.exports = mongoose.model("entry", Schema));
module.exports.get = function (callback, limit) {
  attendance.find(callback).limit(limit);
};
