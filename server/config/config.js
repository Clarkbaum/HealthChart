const settings = {};

settings.default = {
  port: 8000,
  database: { uri: 'mongodb://localhost/healthChart' },
};

module.exports = Object.assign({}, settings.default);

