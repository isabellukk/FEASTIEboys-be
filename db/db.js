require('dotenv').config()
const mongoose = require('mongoose')

//Error - Disconnect
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod is not running ?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

//connection string
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect('mongodb://localhost:27017/recipe', options)


mongoose.connection.once('open', () => {
  console.log('connected to mongoose yay!');
})
