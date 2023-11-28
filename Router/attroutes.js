const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const Signup = require('../model/usermodel.js');
const Signup = require('../model/model.js');

router.post('/register', async (req, res) => {
  try {
    const { UserName, Designation } = req.body;

    const newEmployee = new Signup({ UserName, Designation, checkinStatus: false, date: new Date() });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.use(bodyParser.json());
const userCheckInStatus = {};

function formatHoursMinutesAndSeconds(duration) {
    const hours = Math.floor(duration);
    const minutes = Math.floor((duration % 1) * 60);
    const seconds = Math.round((duration * 3600) % 60);
  
    const formattedDuration =
      (hours > 0 ? hours + ' hour' + (hours > 1 ? 's' : '') : '') +
      ((hours > 0 && minutes > 0) ? ' and ' : '') +
      (minutes > 0 ? minutes + ' minute' + (minutes > 1 ? 's' : '') : '') +
      ((hours > 0 || minutes > 0) && seconds > 0 ? ' and ' : '') +
      (seconds > 0 ? seconds + ' second' + (seconds > 1 ? 's' : '') : '');
  
    return formattedDuration;
  }
  
router.post('/user/checkin', (req, res) => {
  const { UserName } = req.body;

  if (userCheckInStatus[UserName] && userCheckInStatus[UserName].checkInStatus) {
    
    return res.status(400).json({ error: 'User already checked in' });
  }

  userCheckInStatus[UserName] = {
    checkIn: moment().toISOString(),
    checkInStatus: true,
  };

  res.json({
    UserName,
    checkIn: userCheckInStatus[UserName].checkIn,
    checkInStatus: true,
  });
});


router.post('/user/checkout', (req, res) => {
  const { UserName } = req.body;

  if (!userCheckInStatus[UserName] || !userCheckInStatus[UserName].checkInStatus) {
    
    return res.status(400).json({ error: 'User not checked in' });
  }

  userCheckInStatus[UserName].checkOut = moment().toISOString();
  userCheckInStatus[UserName].checkInStatus = false;

  const workingHours = moment(userCheckInStatus[UserName].checkOut)
    .diff(moment(userCheckInStatus[UserName].checkIn), 'hours', true);

  const formattedWorkingHours = formatHoursMinutesAndSeconds(workingHours);

  res.json({
    UserName,
    checkOut: userCheckInStatus[UserName].checkOut,
    checkInStatus: false,
    workingHours: formattedWorkingHours,
  });
 delete userCheckInStatus[UserName];
});


