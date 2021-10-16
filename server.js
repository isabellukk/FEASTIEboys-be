require('dotenv').config()
require('./db/db')

const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 9000
const recipebook = require('./controllers/recipebook.js')

const whitelist = ["http://localhost:3000", "https://FEASTIEboys.surge.sh", "https://feastieboys.herokuapp.com/"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || 1 == 1|| !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};



// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use('/recipes', recipebook)



app.listen(PORT, () => {
  console.log('✨✨', `It's a party on port ${PORT}`, '✨✨',);
})
