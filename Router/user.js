var router = require('express').Router();
const Cryptr = require('cryptr');
var cryptr = new Cryptr('Employee')
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const generateToken = require("../utils/utils.js");
const verifyToken = require("../middleware/middle.js");
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
const emailcount = require ('../model/model.js');

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

    router.post("/authenticate", async (req, res) => {
      const { Empname, password } = req.body;
      const user = await Signup.findOne({ Empname });
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
    
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect Password" });
      }
      const token = generateToken(user);
      res.json({ token });
    });
    
  
    
    
var controller = require('../controller/handle.js');
router.route('/getall').get(controller.index)
router.route('/employee/:user_id').get(controller.view)
router.route('/update/:_id').put(controller.update)
router.route('/delete/_id').delete(controller.Delete)

router.route('/getByEmail/:email').get(controller.see)
router.route('/getByEmail/:Empemail').patch(controller.update) 
// router.route('/getByEmail/:Empemail').put(controller.upgrade)
// router.route('/getByEmail/:email').delete(controller.Delete)

module.exports = router;


    
