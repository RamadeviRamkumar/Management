const router = require('express').Router();
const User = require('../model/adminmodel.js');

const moment = require('moment');

router.get('/users/:id/attendance', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }

    const initialInTime = moment(user.initialInTime);
    const finalOutTime = moment(user.finalOutTime);

    const lateInMinutes = Math.max(0, moment.duration(initialInTime.diff(user.shift)).asMinutes());
    const earlyOutMinutes = Math.max(0, moment.duration(user.shift.diff(finalOutTime)).asMinutes());

    const totalWorkMinutes = moment.duration(finalOutTime.diff(initialInTime)).asMinutes();
    const totalWorkHours = totalWorkMinutes / 60;

  
    let timeStatus = 'On Time';
    if (lateInMinutes > 0) {
      timeStatus = 'Late';
    } else if (earlyOutMinutes > 0) {
      timeStatus = 'Left Early';
    }

    res.json({
      status: "success",
      message: "Attendance calculated successfully",
      data: {
        lateIn: lateInMinutes,
        earlyOut: earlyOutMinutes,
        totalWorkHours: totalWorkHours,
        timeStatus: timeStatus,
      }
    });
  });
});
  //check in
  router.post("/user/:id/enter", async (req, res) => {
    try {
      const data = {
        entry: Date.now()
      };
      const user = await User.findById(req.params.id);
  if(user.attendance && user.attendance.length > 0){
      const lastCheckIn = user.attendance[user.attendance.length - 1];
          const lastCheckInTimestamp = lastCheckIn.date.getTime();
         if (Date.now() > lastCheckInTimestamp + 100) {
            user.attendance.push(data);
            await user.save();
            req.flash('success','You have been signed in for today');
            res.redirect('back')
            
          } else {
            req.flash("error", "You have signed in today already");
            res.redirect("back");
          }
      }else{
          user.attendance.push(data);
          await user.save();
          req.flash('success','You have been signed in for today');
          res.redirect('back')
      }
    
    } catch (error) {
      console.log("something went wrong");
      console.log(error);
    }
  });
  
  //check out
  router.get("/user/:id/exit", async (req, res) => {
    try {
      const user = await User.findOne({_id:req.params.id});
      res.render('checkout',{user});
    } catch (error) {
      console.log('Cannot find User');
    }
   
  });
  
  router.post("/user/:id/exit", async (req, res) => {
    // the attendance than can be checked out must be last entry in the attendance array
    try {
      const user = await User.findOne({_id:req.params.id});
  
        //check if there is an attendance entry
        if(user.attendance && user.attendance.length > 0){ 
  
          //check whether the exit time of the last element of the attedance entry has a value
            const lastAttendance = user.attendance[user.attendance.length - 1];
            if(lastAttendance.exit.time){
              req.flash('error','You have already signed out today');
              res.redirect(`/user/${req.params.id}`);
              return;
            }
            lastAttendance.exit.time = Date.now();
            lastAttendance.exit.reason = req.body.reason;
            await user.save();
            req.flash('success','You have been successfully signed out')
            res.redirect(`/user/${req.params.id}`);
  
        }else{ //if no entry
          req.flash('error','You do not have an attendance entry ');
          res.redirect('back')
        }
    } catch (error) {
      console.log('Cannot find User');
    }
  });

  
function calculateHours(entryTime,exitTime){
    let time = 0;
    time = time + (exitTime - entryTime);
    return time;
  }

  function generateOverview(users){
    //map over the users array  and return something like
    const overview = []
       users.map(user =>{
      let hours = 0;
      if(user.attendance.length > 0 ){
        user.attendance.map(a =>{
          if(a.entry && a.exit.time){
            hours = hours + calculateHours(a.entry.getTime(),a.exit.time.getTime());
          }
         
        })
        hours = parseFloat(hours /(3600*1000)).toFixed(4); 
        overview.push({user,hours})
      }
    })
    return overview;
  }

  function generateUserOverview(user){
    const overview = []
    user.attendance.map( a=>{
     overview.push({
        date: a.date,
        entry: a.entry,
        exit: a.exit.time,
        reason: a.exit.reason
      })

    })
    return overview;
  }

  module.exports = router;