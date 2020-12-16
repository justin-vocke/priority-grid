const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const items = require('./routes/api/items');
const connectDB = require('./config/db');


const app = express();

//Bodyparser Middleware

app.use(express.json());



//Connect to Mongo
connectDB();


//Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
