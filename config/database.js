const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected!'))
  .catch(error => console.log(`Failed to connect to ${process.env.MONGO_URI}!`, error));

  module.exports = mongoose;