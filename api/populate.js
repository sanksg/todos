var models = require('../models');

module.exports.populateDb = function (numUsers) {

  models.User.findAndCountAll()
    .then((result) => {
      var start = result.count+1;
      for (var i = start; i <= start+numUsers; i++) {
        var user = models.User.build({
          userName: 'sanks' + String(i),
          firstName: 'Sankalp',
          lastName: 'Gaur',
          email: "sanks@gaur.com",
          password: "tacobell"
        });

        var list = models.List.build({
          listTitle: 'My list ' + String(i),
          UserUserId: i
        });

        var task = models.Task.build({
          taskTitle: "My Task " + String(i),
          taskDetail: "Get this task done",
          dueWhen: new Date('March ' + String(11 + i) + ', 2016 03:00:00'),
          completed: false,
        });
        
        user.save()
        list.save()
        task.save()
      }
    })
}