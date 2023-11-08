const Cryptr = require("cryptr");
var cryptr = new Cryptr("Employee");
const bcryptjs = require("bcryptjs");
var router = require("express").Router();

const Organization = require("../model/orgmodel.js");

  router.post("/register", async (req, res) => {
    var cryptr = new Cryptr("Employee");
    var enc = cryptr.encrypt(req.body.Password);
    var user = new Organization();
    
    user.OrgName = req.body.OrgName;
    user.Email = req.body.Email;
    user.ContactNo = req.body.ContactNo;
    user.Address = req.body.Address;
    user.Password = req.body.password;
  try {
      await user.save();
      res.status(200).json({
        message: "New Company Added",
        data: {
          
          OrgName: req.body.OrgName,
          ContactNo: req.body.ContactNo,
          Email: req.body.Email,
          Address: req.body.Address,
          Password : enc,
        },
      });
    } catch (err) {
      res.status(400).json({
        message: "In this company already Signup with this page",
        error: err.message,
      });
    }
  });

  var orgcontroller = require("../controller/orgcontroller.js");
router.route("/org/getall").get(orgcontroller.index);
router.route("org/:user_id").get(orgcontroller.view);
router.route("/org/:_id").put(orgcontroller.update);
router.route("/org/delete/:_id").delete(orgcontroller.Delete);

router.route("/getByEmail/:email").get(orgcontroller.see);
router.route("/getByEmail/:Empemail").patch(orgcontroller.update);


module.exports = router;