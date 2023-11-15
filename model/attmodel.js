const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

attendance: [
    {
      workingHours: {
        type: Number,
        default: 0,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      entry: { type: Date },
      exit: {
        time: { type: Date },
        reason: {
          type: Number,
          min: 1,
          max: 2,
        },
      },
    },
],
});

var attendance = (
    module.exports = mongoose.model("admin", Schema));
module.exports.get = function (callback, limit) {
  attendance.find(callback).limit(limit);
};