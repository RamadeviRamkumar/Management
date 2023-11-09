const Schema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId}, 
    shift: { type: mongoose.Types.ObjectId}, 
    date: { type: Date }, 
    lateIn: { type: Number, default: 0 }, 
    earlyOut: { type: Number, default: 0}, 
    overTime: { type: Number }, 
    breakTime: { type: Number }, 
    initialInTime: { type: Date }, 
    finalOutTime: { type: Date }, 
    totalWorkHour: { type: Number },
    timeStatus: { type:  Number },
});
var User = (module.exports = mongoose.model("Admin", Schema));
module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
}; 