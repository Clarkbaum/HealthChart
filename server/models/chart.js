const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chartSchema = Schema({
  heartBeat: String
}, { strict: 'throw' });


module.exports = mongoose.model('charts', chartSchema);