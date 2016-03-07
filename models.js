
const Sequelize = require('sequelize');
const sqlite = require('sqlite3');

var db = new Sequelize('todos', username=null, password=null, options={
  dialect: 'sqlite',
  storage: './todos.sqlite'
});



var Tasks = db.define('tasks', {
  taskId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  taskTitle: Sequelize.TEXT,
  taskDetail: Sequelize.TEXT,
  dueWhen: Sequelize.DATE,
  completed: Sequelize.BOOLEAN
});
Tasks.sync();

var Lists = db.define('lists', {
  listId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  listTitle: Sequelize.STRING
});
Lists.sync();

var TaskList = db.define('taskList', {
  taskId: Sequelize.INTEGER,
  listId: Sequelize.INTEGER
});
TaskList.sync();

var Users = db.define('users', {
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
});
Users.sync();

var listUser = db.define('listUser', {
  listId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER
});
listUser.sync();