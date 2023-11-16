// var router = require("express").Router();
// const attendance = require("../model/attmodel.js");

// router.post("/checkin",async(req,res) => {
//     User.findById(req.user._id)
//     .then((user) => {
//       if (user != null) {
//         if (req.user._id == user._id) {
//           const data = {
//             entry: Date.now(), 
//           };
//           startinghour = config.startinghour; 
//           allowanceminutes = config.allowanceminutes; 
//           currentDate = new Date();
//           currentHour = currentDate.toUTCString().substr(17, 2);
//           currentMinutes = currentDate.getMinutes();
//           console.log(currentHour, currentMinutes);

//           if (user.attendance && user.attendance.length > 0) {
            
// const lastCheckIn = user.attendance[user.attendance.length - 1];
//             const lastCheckInTimestamp = lastCheckIn.date.getTime();

//             const nextCheckIn = new Date(lastCheckInTimestamp);
//             nextCheckIn.setHours(nextCheckIn.getHours() + 24); // grab the timestamp of the next day of last attendance entry

//             if (currentDate.getTime() >= nextCheckIn.getTime()) {
//               // if 24 hrs passed from his last entry

//               if (
//                 currentHour == startinghour &&
//                 currentMinutes <= allowanceminutes
//               ) {
//                 user.attendance.push(data);
//                 user.avaliable = true;
//                 user
//                   .save()
//                   .then((user) => {
//                     res.status(200);
//                     res.setHeader("content-type", "application/json");
//                     res.json({ message: "DONE! You have signed in today" });
//                   })
//                   .catch((err) => next(err));
//               } else {
//                 res.status(200);
//                 res.setHeader("content-type", "application/json");
//                 res.json({ message: "Sorry, You can't check in at this time" });
//               }
//             } else {
//               res.status(200);
//               res.setHeader("content-type", "application/json");
//               res.json({ message: "You are already signed in for today" });
//             }
//           } else {
//             if (
//               currentHour == startinghour &&
//               currentMinutes <= allowanceminutes
//             ) {
//               user.attendance.push(data);
//               user.avaliable = true;
//               user
//                 .save()
//                 .then((user) => {
//                   res.status(200);
//                   res.setHeader("content-type", "application/json");
//                   res.json({ message: "DONE! You have signed in today" });
//                 })
//                 .catch((err) => next(err));
//             } else {
//               res.status(200);
//               res.setHeader("content-type", "application/json");
//               res.json({ message: "Sorry, You can't check in at this time" });
//             }
//           }
//         } else {
//           res.status(401);
//           res.setHeader("content-type", "application/json");
//           res.json({
//             message: "You are not authorized to check-in as this user",
//           });
//         }
//       } else {
//         err = new Error("user doesn't exists");
//         err.statusCode = 404;
//         return next(err);
//       }
//     })
//   .catch((err) => next(err));
// });
