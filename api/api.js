var apiHelper = require('./apiHelper.js');
var pop = require('./populate.js');

exports.userController = {
  getAllUsers: function (request, reply) {
    apiHelper.getAll("User")
    .then(function(allUsers) {
      console.log(allUsers)
      if (allUsers.count == 0) {
        pop.populateDb(3);
      }
      pop.populateDb(5)
      reply(allUsers.rows).code(200)
    });
  },
  getByUserName: function (request, reply) {
    apiHelper.getBy("User", "userName", request.params.userName)
    .then(function(user) {
      console.log(user);
      reply(user).code(200);
    });
  }, 
  createUser: function (request, reply) {
    var paramObj = {};
    console.log(request.payload)
    paramObj.userName = request.payload.userName;
    paramObj.firstName = request.payload.firstName;
    paramObj.lastName = request.payload.lastName;
    paramObj.email = request.payload.email;
    paramObj.password = request.payload.password;
    console.log(paramObj);
    apiHelper.createRecord("User", paramObj)
    .then(function(result) {
      reply(result).code(200);
    })
  }
}
