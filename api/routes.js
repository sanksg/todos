var api = require('./api');

module.exports = [
  // --------------- Users -------------------
  {
    method: 'GET',
    path: '/api/users',
    handler: api.userController.getAllUsers
  },
  {
    method: 'GET',
    path: '/api/users/{userName}',
    handler: api.userController.getByUserName
  },
  {
    method: 'POST',
    path: '/api/users/create',
    handler: api.userController.createUser
  },
//  {
//    method: 'PUT',
//    path: '/api/users/{userName}',
//    handler: api.userController.updateUser
//  },
//  {
//    method: 'DELETE',
//    path: '/api/users/{userName}',
//    handler: api.userController.destroyUser 
//  },
//  // ------------------- Lists ----------------
//  {
//    method: 'GET',
//    path: '/api/lists',
//    handler: api.listController.getAllLists
//  },
//  {
//    method: 'GET',
//    path: '/api/lists/{listId}',
//    handler: api.listController.getByListId
//  },
//  {
//    method: 'POST',
//    path: '/api/lists/{listId}',
//    handler: api.listController.postByListId
//  },
//  {
//    method: 'PUT',
//    path: '/api/lists/{listId}',
//    handler: api.listController.putByListId 
//  },
//  {
//    method: 'DELETE',
//    path: '/api/lists/{listId}',
//    handler: api.listController.delByListId 
//  },
//  
//  // ------------------ Tasks ---------------------
//  {
//    method: 'GET',
//    path: '/api/tasks',
//    handler: api.taskController.getAllTasks
//  },
//  {
//    method: 'GET',
//    path: '/api/tasks/{taskId}',
//    handler: api.taskController.getByTaskId
//  },
//  {
//    method: 'POST',
//    path: '/api/tasks/{taskId}',
//    handler: api.taskController.postByTaskId
//  },
//  {
//    method: 'PUT',
//    path: '/api/tasks/{taskId}',
//    handler: api.taskController.putByTaskId 
//  },
//  {
//    method: 'DELETE',
//    path: '/api/tasks/{taskId}',
//    handler: api.taskController.delByTaskId 
//  }
  
];
