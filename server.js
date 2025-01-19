const express = require('express');
const app = express();
const connectDB = require('./db'); // Adjust path to the db.js file
require('dotenv').config(); // Load environment variables
const port = 3000;


connectDB();

app.use('/', require('./routes'));

app.listen(process.env.PORT || port);
console.log('Web Server is listening at port ' + (process.env.port || port));

