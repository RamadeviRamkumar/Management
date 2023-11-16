var router = require("express").Router();
const Cryptr = require("cryptr");
const cryptr = new Cryptr("Employee");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

router.get("/read", function (req, res) {
  res.json({
    Status: "API works",
    message: "Welcome to signin Page",
  });
});

router.post("/login", async (req, res) => {
  try {
    const { UserName, OrgName, Password } = req.body;
    
const Org = await Organization.findOne({ OrgName });
      if (!Org) {
      return res.status(404).json({
        message: "Organization not found. Staff sign-in denied.",
      });
    }

    const user = await Signup.findOne({ UserName });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const decryptedPassword = cryptr.decrypt(user.Password);
console.log(decryptedPassword)
    if (decryptedPassword === req.body.Password) {
      return res.json({
        message: "Sign-in successful",
        data: user,
      });
    } else {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ramdevcse25@gmail.com",
    pass: "tqvtdfsauntlxqju",
  },
});

function generateOTP() {
  const chars = "0123456789";
  const len = chars.length;
  let Otp = "";
  for (let i = 0; i < 6; i++) {
    Otp += chars[Math.floor(Math.random() * len)];
    // user.resetPasswordToken = token;
    // user.resetPasswordExpires = Date.now() + 360000;
  }
  return Otp;
}

async function sendOTP(email, Otp) {
  const mailOptions = {
    from: "ramdevcse25@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${Otp}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
  } catch (err) {
    console.error(err);
    throw new Error("Failed to send OTP");
  }
}
router.post("/forgotpassword", async (req, res) => {
  try {
    const { Email } = req.body;

    const user = await Signup.findOne({ Email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      const Otp = generateOTP();
      const user = await Signup.findOneAndUpdate(
        { Email },
        { $set: { Otp } },
        { new: true }
      );
      user.Otp = Otp;
      await user.save();
      await sendOTP(Email, Otp);
      res.status(200).json({ message: "OTP sent successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

router.post("/verify", async (req, res) => {
  const { Email, Otp } = req.body;

  if (!Email || !Otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  try {
    const user = await Signup.findOne({ Email });

    if (user && user.Otp === Otp) {
      user.Otp = null;
      await user.save();
      res.json({ success: true, message: "OTP is valid" });
    } else {
      res.status(401).json({ error: "Invalid OTP" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

router.post("/resetpassword", async (req, res) => {
  const { UserName, newpassword } = req.body;

  try {
    const user = await Signup.findOne({ UserName });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!newpassword) {
      return res.status(400).json({
        message: "New password is empty",
      });
    }
    const encryptedNewPassword = cryptr.encrypt(newpassword);
    user.Password = encryptedNewPassword;
    await user.save();

    return res.status(200).json({
      message: "Password reset successful",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});
const Signup = require("../model/usermodel.js");
router.post("/register", async (req, res) => {
  var cryptr = new Cryptr("Employee");
    var enc = cryptr.encrypt(req.body.Password);
    var dec = cryptr.decrypt(enc);
      var user = new Signup();
      user.Name = req.body.Name;
      user.UserName =req.body.UserName;
      user.Empid = req.body.Empid;
      user.Gender = req.body.Gender;
      user.DateOfBirth = req.body.Dateofbirth;
      user.DateOfJoining = req.body.Dateofjoining;
      user.ContactNo = req.body.ContactNo;
      user.Email = req.body.Email;
      user.Address = req.body.Address;
      user.Designation = req.body.Designation;
      user.OrgName = req.body.OrgName;
      user.BankName =req.body.BankName;
      user.Branch = req.body.Branch;
      user.Ifsc = req.body.Ifsc;
      user.AccountNo = req.body.AccountNo;
      user.Salary = req.body.Salary;
      // user.MaritalStatus = req.body.MaritalStatus;
      user.Status = req.body.Status;
      user.Password = enc;
      user.City = req.body.City;
      user.State = req.body.State;
      user.Pincode = req.body.Pincode;
      // user.BloodGroup = req.body.BloodGroup;
      user.Usertype = req.body.Usertype;
      try {
        await user.save();
        res.status(200).json({
      Message : "Registration Successful",
      data : {
      Password: enc,
      
      UserName      : req.body.UserName,
      Name          : req.body.Name,
      Empid         : req.body.Empid,
      Gender        : req.body.Gender,
      DateOfBirth   : req.body.DateOfBirth,
      // MaritalStatus : req.body.MaritalStatus,
      DateOfJoining : req.body.DateOfJoining,
      ContactNo     : req.body.ContactNo,
      Email         : req.body.Email,
      Designation   : req.body.Designation,
      Address       : req.body.Address,
      City          : req.body.City,
      State         : req.body.State,
      Pincode       : req.body.Pincode,
      // BloodGroup    : req.body.BloodGroup,
      OrgName       : req.body.OrgName,
      BankName      : req.body.BankName,
      Branch        : req.body.Branch,
      Ifsc          : req.body.Ifsc,
      AccountNo     : req.body.AccountNo,
      Salary        : req.body.Salary,
      Usertype      : req.body.Usertype,
        },
    });
} catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});     
//checkin
// router.post("/user/:id/enter", async (req, res) => {
//   try {
//     const currentDate = new Date(); // Gets the current date and time in the local time zone
//     console.log(currentDate.toLocaleString());
//     const data = {
//      // Logs the date and time in a human-readable format based on the local time zone

//       entry: currentDate,
//     };
//     const user = await Signup.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }
//   if (user.attendance && user.attendance.length > 0) {
//       const lastCheckIn = user.attendance[user.attendance.length - 1];
//       const lastCheckInTimestamp = lastCheckIn.entry;

//       if (Date.now() > lastCheckInTimestamp + 24 * 60 * 60 * 1000) {
//         user.attendance.push(data);
//         await user.save();
//         return res.status(200).json({
//           message: "Check-in successful",
//           data: user.attendance,
//         });
//       } else {
//         return res.status(400).json({
//           message: "You have already checked in today",
//         });
//       }
//     } else {
//       user.attendance.push(data);
//       await user.save();
//       return res.status(200).json({
//         message: "First check-in for the user",
//         data: user.attendance,
//       });
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//     return res.status(500).json({
//       message: "An error occurred",
//       error: error.message,
//     });
//   }
// });





//checkout
// router.get("/user/:id/exit", async (req, res) => {
//   try {
//     const user = await Signup.findOne({_id:req.params.id});
//     res.render('checkout',{user});
//   } catch (error) {
//     console.log('Cannot find User');
//   }
 
// });

// router.post("/user/:id/exit", async (req, res) => {
   
//   try {
//     const user = await Signup.findOne({_id:req.params.id});
//     if(user.attendance && user.attendance.length > 0){ 

//           const lastAttendance = user.attendance[user.attendance.length - 1];
//           if(lastAttendance.exit.time){
//             req.flash('error','You have already signed out today');
//             res.redirect(`/user/${req.params.id}`);
//             return;
//           }
//           lastAttendance.exit.time = Date.now();
//           lastAttendance.exit.reason = req.body.reason;
//           await user.save();
//           req.flash('success','You have been successfully signed out')
//           res.redirect(`/user/${req.params.id}`);

//       }else{ 
//         req.flash('error','You do not have an attendance entry ');
//         res.redirect('back')
//       }
//   } catch (error) {
//     console.log('Cannot find User');
//   }
// });

var usercontroller = require("../controller/usercontroller.js");
router.route("/employee/getall").get(usercontroller.index);
router.route("/employee/:user_id").get(usercontroller.view);
router.route("/update/:_id").put(usercontroller.update);
router.route("/delete/:_id").delete(usercontroller.Delete);

router.route("/getByEmail/:email").get(usercontroller.see);
router.route("/getByEmail/:Empemail").patch(usercontroller.update);
// router.route('/getByEmail/:Empemail').put(controller.upgrade)
// router.route('/getByEmail/:email').delete(controller.Delete)

module.exports = router;
