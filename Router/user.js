let router = require('express').Router();
const Cryptr = require('cryptr');
var cryptr = new Cryptr('Employee')
const bcrypt = require("bcryptjs");

router.get('/read',function(req,res){
    res.json({
        Status: 'API works',
        message:"Welcome to signin Page",
    })
});
const Signup = require('../model/model.js');
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

router.post('/signup',async(req,res)=> {
    var cryptr = new Cryptr('Employee');
    var enc = cryptr.encrypt(req.body.Password);
    // var dec = cryptr.decrypt(enc);
    
    var user = new Signup();
    user.Empname = req.body.Empname;
    user.Empemail = req.body.Empemail;
    user.Phonenumber = req.body.Phonenumber;
    user.Password =enc ;
    try{
       await user.save();
       res.status(201).json({
        message : "New User Signup Successfully",
        data:{
            Empname : req.body.Empname,
            Empemail : req.body.Empemail,
            Phonenumber : req.body.Phonenumber,
            Password : enc,
        },
       });
    } catch(err) {
        res.status(400).json({
            message : "User Already Signed up with this email",
            error : err.message,
        });
    }
});

var controller = require('../controller/handle.js');
router.route('/getall').get(controller.index)
router.route('/employee/:user_id').get(controller.view)
router.route('/update/:_id').put(controller.update)
router.route('/delete/_id').delete(controller.Delete)

router.route('/getByEmail/:Empemail').get(controller.see)
// router.route('/getByEmail/:Empemail').patch(controller.update) 
// router.route('/getByEmail/:Empemail').put(controller.update)
router.route('/getByEmail/:Empemail').delete(controller.Delete)

module.exports = router;


    
