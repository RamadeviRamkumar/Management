const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require("moment");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");

app.use(
  session({
    secret: "123456789",
    resave: false,
    saveUninitialized: false
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.moment = moment;
  next();
});
const apiRoutes = require("./Router/userroutes.js");
const OrgRoutes = require("./Router/Orgroutes.js");
const attRoutes = require("./Router/attroutes.js");

const mongodb = require("./mongo/DB.js");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongo = mongoose.connect(mongodb.url, { useNewUrlParser: true, useUnifiedTopology: true });
mongo.then(() => {
    console.log('Server Connected to MongoDB');
}).catch(error => {
    console.log('Error while connecting to MongoDB:', error);
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log('Server running on port ' + port);
});

app.get('/', (req, res) => {
    res.send('Welcome to the signin page');
});

app.use('/api', apiRoutes);
app.use("/org", OrgRoutes);
app.use("/att",attRoutes);

module.exports = app;
