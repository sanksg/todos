var models = require('../models');

module.exports = {
  getAll: function (modelName) {
      return models[modelName].findAndCountAll()
  },
  getBy: function (modelName, paramName, paramVal) {
    var qry = {'where': {}};
    qry['where'][paramName] = paramVal;
    return models[modelName].findOne(qry);
  },
  getByAll: function(modelName, paramName, paramVal) {
    var qry = {'where': {}};
    qry['where'][paramName] = paramVal
    return models[modelName].findAll(qry);
  },
  createRecord: function (modelName, paramObj) {
    console.log(modelName, paramObj)
    return models[modelName].create(paramObj)
  }
}
