var models = require('../models');


var getAll = function (modelName) {
  models[modelName].findAndCountAll()
    .then(function (result) {
      console.log(result)
      return result;
    })
};
var getBy = function (modelName, paramName, paramVal) {
  var qry = {};
  qry['where'][paramName] = paramVal;
  models[modelName].findOne(qry)
    .then((result) => {
      console.log(result);
      return result;
    });
};


exports.userController = {

  getAllUsers: (request, reply) => {
    reply(getAll("User")).code(200)
  },
  getByUserName: function (request, reply) {
    reply(getBy("User", "userName", request.params.userName)).code(200);
  },
}
