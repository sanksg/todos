var models = require('../models');

exports.users = {
  getAllUsers: function(request, reply){
    models.User.findAll()
    .then(function(users){
      reply(users).code(200);
    })
  },
  getByUserId: function(request, reply){
    models.User.find().where()
    .then(function())
  }
} 