require ('../models');
module.exports.populate = function () {
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

    user.save();
    list.save();
    task.save();
  }
