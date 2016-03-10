var models = require('../models');


var getAll = function (modelName) {
  console.log(models[modelName])
  models[modelName].findAndCountAll()
    .then(function (result) {
      console.log(result);
      if (result = {}) {
        populate();
      }
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

var populate = function () {
  console.log(models.User)
  var user = models.User.build({
    userName: 'sanks',
    firstName: 'Sankalp',
    lastName: 'Gaur',
    email: "sanks@gaur.com",
    password: "tacobell"
  });

  var list = models.List.build({
    listTitle: 'My first list',
    UserUserId: 1
  });

  var task = models.Task.build({
    taskTitle: "My Task",
    taskDetail: "Get this task done",
    dueWhen: new Date('March 11, 2016 03:00:00'),
    completed: false,
  });
//
//  var taskListMap = models.taskListMap.build({
//    taskId: 1,
//    listId: 1
//  });

  user.save();
  list.save();
  task.save();
}


exports.userController = {

  getAllUsers: (request, reply) => {
    console.log("Hello")
    reply(getAll("User")).code(200)
  },
  getByUserName: function (request, reply) {
    reply(getBy("User", "userName", request.params.userName)).code(200);
  },
}