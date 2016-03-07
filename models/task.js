"use strict";

module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    taskId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    taskTitle: DataTypes.TEXT,
    taskDetail: DataTypes.TEXT,
    dueWhen: DataTypes.DATE,
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models){
        Task.belongsToMany(models.List, {
          through: "taskListMap",
          foreignKey:"taskId",
          onDelete: "CASCADE"
        })
      }
    }
  });
  
  return Task;
};