'use strict'

const Hapi = require('hapi');
//const Inert = require('inert')
const Path = require('path');
//const Hoek = require('hoek');
//const Vision = require('vision');
//const Joi = require('joi');
//const Boom = require('boom');

console.log(__dirname)
var Models = require(Path.join(__dirname, 'models', 'index.js'));




//*************** Server ****************************
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080),
  labels: "main"
});

// ************ Server Plugins  ********************

// *************** Server Auth and Views ****************

// ******************** Routes *************************
server.route(require('./api/routes'));


// *********************** Start the Server *************************
Models.sequelize.sync().then(function() {
  server.start(function (err) {
    if (err) {
      throw err;
    }
    console.log('Main server running at:', server.connections[0].info.uri)
  });
});
