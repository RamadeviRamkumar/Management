var router = require('express').Router();
const Cryptr = require('cryptr');
var cryptr = new Cryptr('Employee')
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const otpGenerator = require('otp-generator');
const jwt = require("jsonwebtoken"); 
const swaggerJSDOC = require ('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')


router.get('/read',function(req,res){
    res.json({
        Status: 'API works',
        message:"Welcome to signin Page",
    })
});

router.post("/signin", async (req, res) => {
  try {
    const { Empname, Password } = req.body;

    const users = await Signup.findOne({ Empname });

    if (!users) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const decryptedPassword = cryptr.decrypt(users.Password);

    if (decryptedPassword === Password) {
      return res.json({
        message: "Signin successful",
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
  service: 'Gmail',
  auth: {
    user: 'ramdevcse25@gmail.com',
    pass: 'tqvtdfsauntlxqju',
  },
});

function generateOTP() {
  const chars = '0123456789';
  const len = chars.length;
  let Otp ="";
  for(let i=0;i<6;i++){
    Otp += chars[Math.floor(Math.random()*len)];
    // user.resetPasswordToken = token;
    // user.resetPasswordExpires = Date.now() + 360000;
  }
  return Otp;
}

async function sendOTP(email, Otp) {
  const mailOptions = {
    from: 'ramdevcse25@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${Otp}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully');

  } catch (err) {
    console.error(err);
    throw new Error('Failed to send OTP');
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
     
      // console.log(users.otp)
      const user = await Signup.findOneAndUpdate({ Empemail }, {$set:{Otp} }, { new: true });
      user.Otp = Otp; 
      await user.save(); 
      await sendOTP(Empemail, Otp);
      res.status(200).json({ message: 'OTP sent successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

router.post('/verify', async (req, res) => {
  const { Empemail, Otp } = req.body;

  if (!Empemail || !Otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  try {
    const user = await Signup.findOne({ Empemail });

    if (user && user.Otp === Otp) {
      user.Otp = null;
      await user.save(); 
      res.json({ success: true, message: 'OTP is valid' });
    } else {
      res.status(401).json({ error: 'Invalid OTP' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error:err });
  }
});

// router.post('/resetPassword', async (req, res) => {
//   const {Otp} = req.body;
//   const { newpassword } = req.body;
//    const user = await Signup.findOne({
//       Otp:Otp,
//       resetPasswordExpires: { $gt: Date.now() },
//     });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid token" });
//     }
//     // const Password = await bcrypt.hash(newpassword, 10);
//     user.Password = Password;
//     user.Otp = null;
//     user.resetPasswordExpires = null;
  
//     await user.save();
  
//     res.json({ message: "Password reset Successful" });
//   });
const Signup = require('../model/model.js');

    router.post('/register', async (req, res) => {
        var cryptr = new Cryptr('Employee');
        var enc = cryptr.encrypt(req.body.Password);
        var user = new Signup();
        user.Empname      = req.body.Empname;
        user.Empid        = req.body.Empid;
        user.Empemail     = req.body.Empemail;
        user.EmpContactNo = req.body.EmpContactNo;
        user.AddressLine1 = req.body.AddressLine1;
        user.AddressLine2 = req.body.AddressLine2;
        user.Pincode      = req.body.Pincode;
        user.City         = req.body.City;
        user.State        = req.body.State;
        user.BankName     = req.body.BankName;
        user.Ifsc         = req.body.Ifsc;
        user.AccountNo    = req.body.AccountNo;
        user.BankBranch   = req.body.BankBranch;
        user.Salary       = req.body.Salary;
        user.Password     = enc;
            
        try {
            await user.save();
            res.status(200).json({
                message: 'New user signed up',
                data: {
                    Empname      : req.body.Empname,
                    Empid        : req.body.Empid,
                    EmpContactNo : req.body.EmpContactNo,
                    Empemail     : req.body.Empemail,
                    AddressLine1 : req.body.AddressLine1,
                    AddressLine2 : req.body.AddressLine2,
                    Pincode      : req.body.Pincode,
                    City         : req.body.City,
                    State        : req.body.State,
                    BankName     : req.body.BankName,
                    Ifsc         : req.body.Ifsc,
                    AccountNo    : req.body.AccountNo,
                    BankBranch   : req.body.BankBranch,
                    Salary       : req.body.Salary,   
                   Password      : enc,
                },
            });
        } catch (err) {
            res.status(400).json({
                message: 'User already signed up with this Email',
                error: err.message, 
            });
        }
    });

var controller = require('../controller/handle.js');
router.route('/getall').get(controller.index)
router.route('/employee/:user_id').get(controller.view)
router.route('/update/:_id').put(controller.update)
router.route('/delete/:_id').delete(controller.Delete)

router.route('/getByEmail/:email').get(controller.see)
router.route('/getByEmail/:Empemail').patch(controller.update) 
// router.route('/getByEmail/:Empemail').put(controller.upgrade)
// router.route('/getByEmail/:email').delete(controller.Delete)

module.exports = router;


    
