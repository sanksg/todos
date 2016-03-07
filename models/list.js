"use strict";

module.exports = function(sequelize, DataTypes){
  var List = sequelize.define("List", {
    listId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    listTitle: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models){
        List.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
        List.belongsToMany(models.Task, {
          through: "taskListMap",
          onDelete: "CASCADE",
          foreignKey: "listId"
        });
      }
    }
  });
  return List;
};