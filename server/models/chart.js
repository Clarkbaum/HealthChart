const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chartSchema = Schema({
  heartBeat: Number
}, { strict: 'throw' });


module.exports = mongoose.model('charts', chartSchema);