
const router = require('express').Router();

const Signup = require("../model/attmodel.js"); // Assuming the model is named 'usermodel.js'

router.post("/user/:id/enter", async (req, res) => {
  try {
    // const userId = req.params.id;
    // const user = await Signup.findById(userId);
    const user = await Signup.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const currentDate = Date.now();
    const data = {
      userId: user._id, // Store user's database ID
      Name: user.Name, // Store the username
      entry: currentDate,
    };

    if (user.attendance && user.attendance.length > 0) {
      const lastCheckIn = user.attendance[user.attendance.length - 1];
      const lastCheckInTimestamp = lastCheckIn.entry;

      if (currentDate > lastCheckInTimestamp + 24 * 60 * 60 * 1000) {
        user.attendance.push(data);
        await user.save();

        return res.status(200).json({
          message: "Check-in successful",
          data: user.attendance,
        });
      } else {
        return res.status(400).json({
          message: "You have already checked in today",
        });
      }
    } else {
      user.attendance = [data];
      await user.save();

      return res.status(200).json({
        message: "First check-in for the user",
        data: user.attendance,
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

router.get("/user/:id/exit", async (req, res) => {
  try {
    const user = await attendance.findById(req.params.id);
    res.render('checkout', { user });
  } catch (error) {
    console.log('Cannot find User');
  }
});

router.post("/user/:id/exit", async (req, res) => {
  try {
    const user = await attendance.findById(req.params.id);

    if (user && user.attendance && user.attendance.length > 0) {
      const lastAttendance = user.attendance[user.attendance.length - 1];

      if (lastAttendance.exit && lastAttendance.exit.time) {
        req.flash('error', 'You have already signed out today');
        res.redirect(`/user/${req.params.id}`);
        return;
      }

      lastAttendance.exit = {
        time: Date.now(),
        reason: req.body.reason,
      };

      await user.save();
      req.flash('success', 'You have been successfully signed out');
      res.redirect(`/user/${req.params.id}`);
    } else {
      req.flash('error', 'You do not have an attendance entry');
      res.redirect('back');
    }
  } catch (error) {
    console.log('Error:', error);
    req.flash('error', 'Cannot find User');
    res.redirect('back');
  }
});


module.exports = router;