var router = require("express").Router();
const Cryptr = require("cryptr");
var cryptr = new Cryptr("Employee");
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
    const { Username, OrgName, Password } = req.body;
    
    // First, define the Organization variable
    const Organization = await Signup.findOne({ OrgName });
console.log(Organization)
    if (!Organization) {
      return res.status(404).json({
        message: "Organization not found. Staff sign-in denied.",
      });
    }

    const users = await Signup.findOne({ Username });

    if (!users) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const decryptedPassword = cryptr.decrypt(users.Password);

    if (decryptedPassword === Password) {
      return res.json({
        message: "Sign-in successful",
        data: users,
      });
    } else {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }
  } catch (error) {
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
    const { Empemail } = req.body;

    const user = await Signup.findOne({ Empemail });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      const Otp = generateOTP();
      const user = await Signup.findOneAndUpdate(
        { Empemail },
        { $set: { Otp } },
        { new: true }
      );
      user.Otp = Otp;
      await user.save();
      await sendOTP(Empemail, Otp);
      res.status(200).json({ message: "OTP sent successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

router.post("/verify", async (req, res) => {
  const { Empemail, Otp } = req.body;

  if (!Empemail || !Otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  try {
    const user = await Signup.findOne({ Empemail });

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
  const { Empemail, newpassword } = req.body;

  try {
    const user = await Signup.findOne({ Empemail });

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
const Signup = require("../model/model.js");

router.post("/register", async (req, res) => {
  var cryptr = new Cryptr("Employee");
  var enc = cryptr.encrypt(req.body.Password);
  var user = new Signup();
  user.Username = req.body.Username;
  user.Empname = req.body.Empname;
  user.Empid = req.body.Empid;
  user.Email = req.body.Email;
  user.Designation = req.body.Designation;
  user.ContactNo = req.body.ContactNo;
  user.Address = req.body.Address;
  user.Pincode = req.body.Pincode;
  user.City = req.body.City;
  user.State = req.body.State;
  user.BankName = req.body.BankName;
  user.Ifsc = req.body.Ifsc;
  user.AccountNo = req.body.AccountNo;
  user.BankBranch = req.body.BankBranch;
  user.Salary = req.body.Salary;
  user.Password = enc;
  user.Usertype = req.body.Usertype;
  user.OrgName = req.body.OrgName;

  const Organization = await Organization.findOne({ OrgName });

    if (!Organization) {
      return res.status(404).json({
        message: "Organization not found. Staff registration denied.",
      });
    }

  try {

    await user.save();
    res.status(200).json({
      message: "New user signed up",
      data: {
        Empname: req.body.Empname,
        Empid: req.body.Empid,
        ContactNo: req.body.ContactNo,
        Email: req.body.Email,
        Designation : req.body.Designation,
        Address: req.body.Address,
        Pincode: req.body.Pincode,
        City: req.body.City,
        State: req.body.State,
        BankName: req.body.BankName,
        Ifsc: req.body.Ifsc,
        AccountNo: req.body.AccountNo,
        BankBranch: req.body.BankBranch,
        Salary: req.body.Salary,
        Password: enc,
        Usertype : req.body.Usertype,
        OrgName : req.body.OrgName,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "User already signed up with this Email",
      error: err.message,
    });
  }
});

var controller = require("../controller/handle.js");
router.route("/user/getall").get(controller.index);
router.route("/employee/:user_id").get(controller.view);
router.route("/update/:_id").put(controller.update);
router.route("/delete/:_id").delete(controller.Delete);

router.route("/getByEmail/:email").get(controller.see);
router.route("/getByEmail/:Empemail").patch(controller.update);
// router.route('/getByEmail/:Empemail').put(controller.upgrade)
// router.route('/getByEmail/:email').delete(controller.Delete)

module.exports = router;
