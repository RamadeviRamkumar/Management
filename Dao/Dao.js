const Cryptr = require("cryptr");
const Signup = require("../model/model.js");

exports.Dao_index = async function (req, res) {
  try {
    const users = await Signup.find();

    if (users) {
      res.json({
        status: "Success",
        message: "Got all user details Successfully",
        data: users,
      });
    } else {
      res.json({
        status: "Error",
        message: "No users found",
      });
    }
  } catch (err) {
    res.json({
      status: "Error",
      message: err.message,
    });
  }
};

exports.Dao_view = async (req, res) => {
  try {
    const user = await Signup.findById(req.params.user_id);
    if (!user) {
      return res.json({
        status: "Error",
        message: "User not found",
      });
    }
    res.json({
      status: "Success",
      message: "User details retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.Dao_see = async (req, res) => {
  try {
    const user = await Signup.findOne({ Empemail: req.params.Empemail });
    // console.log(Empemail);
    console.log(user);
    if (!user) {
      return res.json({
        status: "Error",
        message: "Employee Email not found",
      });
    }

    res.json({
      status: "Success",
      message: "Employee details retrieved by Email successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.Dao_update = async (req, res) => {
  // try {
  //   const { username } = req.params;

  //   const Empdata = {
  //     Empname: req.body.Empname,
  //     // Age: req.body.Age,
  //     // Gender: req.body.Gender,
  //     // DOB: req.body.DOB,
  //     Phonenumber: req.body.Phonenumber,
  //     Empemail: req.body.Empemail,
  //     password: enc,
  //   };

  //   if (Empdata.password) {
  //    Empdata.password = cryptr.encrypt(Empdata.password);
  //   }

  //   const user = await service.Service_update(username, user);

  //   if (!user) {
  //     return res.json({
  //       status: "Error",
  //       message: "Username incorrect or update failed",
  //     });
  //   }

  //   res.json({
  //     status: "Success",
  //     message: "Employee details updated successfully",
  //     data: user,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     status: "Error",
  //     message: error.message,
  //   });
  // }
  try {
    const id = req.params._id;
    const user = await Signup.findByIdAndUpdate(id, req.body, { new: true });
    if (user) {
      res.status(200).json({
        message: "User Details Updated Successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        error: "User NOT Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

exports.Dao_delete = async (req, res) => {
  try {
    const id = req.params._id;
    const user = await Signup.findByIdAndDelete(_id);
    if (user) {
      res.status(200).json({
        message: "User Details deleted Successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        error: "User NOT Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
