require('dotenv').config()
const mongoose = require ('mongoose')
const DB_URL = process.env.DB_URL || 'mongodb://localhost/recipebook'

mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
  console.log('connected to mongoose yay!');
})
