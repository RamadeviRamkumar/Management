const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const apiRoutes = require("./Router/userroutes.js");
const OrgRoutes = require("./Router/Orgroutes.js");
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

app.use('/api/user', apiRoutes);
app.use("/api/org", OrgRoutes);

module.exports = app;
