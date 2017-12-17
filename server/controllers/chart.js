//chart.js
const Chart = require('../models/chart.js');

exports.create = (request, response) => {
  const chart = Object.assign({}, request.body);
  Chart.create(chart)
  .then(result => response.status(201).json(result))
  .catch((err) => console.log("chart.create error", err));
};

exports.get = (request, response) => {
  Chart.find()
  .then(result => response.status(200).json(result))
  .catch((err) => console.log("chart.get error", err));
};

exports.update = (request, response) => {
  console.log("updated")
  Chart.findById(request.params.chart).exec()
  .then((data) => {
    const doc = data;
    doc.body = request.body.body;
    return doc.save();
  })
  .then((result) => {
    response.status(200).json(result);
  })
  .catch((err) => console.log("chart.update error", err));
};

exports.delete = (request, response) => {
  Chart.findById(request.params.chart).exec()
  .then(doc => doc.remove())
  .then(doc => response.status(200).json(doc))
  .catch((err) => console.log("chart.delete error", err));
};