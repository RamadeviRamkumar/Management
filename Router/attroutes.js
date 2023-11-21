const router = require('express').Router();
const moment = require('moment');
const Signup = require('../model/usermodel.js');

router.post('/checkin/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const now = new Date();
    const user = await Signup.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (user.lastCheckin && now - user.lastCheckin < 24 * 60 * 60 * 1000) {
      return res.status(400).json({ message: 'User already checked in within the last 24 hours' });
    }

    user.lastCheckin = now;
    await user.save();
    const Attendance = require("../model/attmodel.js");
    const checkinDetails = new Attendance({
      UserName: user.UserName,
      checkinTime: now,
    });

    await checkinDetails.save();
    return res.status(200).json({
      message: 'Check-in successful',
      data: { checkin: now, UserName: user.UserName },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/checkout/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const now = new Date();
    const user = await Signup.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (user.lastCheckout) {
      return res.status(400).json({ message: 'User has already checked out' });
    }

    user.lastCheckout = now;
    await user.save();

    const workingHours = calculateWorkingHours(user.lastCheckin, now);
    const formattedWorkingHours = `${workingHours.hours} hours and ${workingHours.minutes} minutes`;

    console.log(`Working Hours: ${formattedWorkingHours}`);

    return res.status(200).json({
      message: 'Check-out successful',
      data: {
        checkout: now,
        UserName: user.UserName,
        workingHours: formattedWorkingHours,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/att', async (req, res) => {
  try {
    const employees = await Signup.find();
    return res.json(employees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

function calculateWorkingHours(checkin, checkout) {
  const checkinTime = moment(checkin);
  const checkoutTime = moment(checkout);
  const diffInMinutes = checkoutTime.diff(checkinTime, 'minutes');
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  return { hours, minutes };
}

module.exports = router;