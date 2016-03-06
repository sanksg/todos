'use strict'

const Hapi = require('hapi');
const Inert = require('inert')
const Path = require('path');
const Hoek = require('hoek');
const Vision = require('vision');
const H2o2 = require('h2o2');
const Fs = require('fs');
const Joi = require('joi');
const Rot13 = require('rot13-transform');
const Boom = require('boom');
const Basic = require('hapi-auth-basic');
//const Bcrypt = require('bcrypt');



const users = {
  hapi: {
    username: 'hapi',
    password: 'auth',
    name: 'hapi',
    id:'001'
  }
};

const validate = function(request,username, password, callback){
  console.log(username)
  let user = users[username]
  console.log(user)
  
  if (user == undefined || password != user.password) {
    console.log("Bad user or pass")
    callback(Boom.unauthorized("Bad username or password"), false, null);
  } else {    
    console.log("Success")
    callback(null, true, {id:user.id, name: user.name});  
  }

};


//*************** Server ****************************
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080),
  labels: "main"
});

//
//server.connection({
//  host: 'localhost',
//  port: 65535,
//  labels: "proxy"
//});
//

// ************ Server Plugins  ********************
server.register(Inert, (err) => {
  Hoek.assert(!err, err);
});

server.register(Vision, (err) => {
  Hoek.assert(!err, err);
});

server.register(H2o2, (err) => {
  Hoek.assert(!err, err);
});

server.register(Basic, (err) => {
  Hoek.assert(!err, err);
});

// *************** Server Auth and Views ****************
server.auth.strategy('simple', 'basic', { validateFunc: validate });

//server.views({
//  engines: {
//    html: require('handlebars')
//  },
//  relativeTo: __dirname,
//  path: 'templates',
//  helpersPath: 'helpers'
//});

// ******************** Routes *************************
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
//    console.log("Query: ", request.query);
//    reply.view("index", {
//      query: request.query
//    })
//    
//    var content = "";
//    var strm = Fs.createReadStream('public/hapiness.txt');
//    reply(strm.pipe(Rot13()))
//    console.log(request.auth.credentials.name)
    return reply('Hello ' + request.auth.credentials.name);
  },
  config: {
    auth: 'simple',
  }
  
  
});


server.state('session', {
  ttl:10,
  encoding: "base64json",
  path:'/',
  domain:'localhost'
});


server.route({
  method: 'GET',
  path: '/set-cookie',
  handler: function (request, reply) {
    return reply('Hello').state('session', {key : 'makemehapi'});
  },
  config: {
    state: {
        parse: true, // parse and store in request.state
        failAction: 'log' // may also be 'ignore' or 'log'
    }
  }
});

server.route({
  method: 'GET',
  path: '/check-cookie',
  handler: function(request, reply){
    console.log(request.state.session)
    if (request.state.session) {
      return reply({user: 'hapi'})
    } else {
      return reply(Boom.badRequest('unauthorized access'));
    }
  }
});

//
//server.route({
//  method: ['PUT', 'POST'],
//  path: '/upload',
//  handler: function (request, reply) {
//
//      var retobj = {}
//      retobj["description"]= request.payload.description
//      var dataBody = '';
//      request.payload.file.on('data', function (data) {
//        dataBody += data
//      });
//      request.payload.file.on('end', function (){
//        retobj["file"] =  {data: dataBody, 
//                           filename: request.payload.file.hapi.filename, 
//                           headers: request.payload.file.hapi.headers 
//                          };
////        console.log(retobj)
//        return reply(retobj);
//      });
//      
//
//
//  },
//  config: {
//    payload: {
//      output: 'stream',
//      parse: true,
//      uploads: './uploads'
//    }
//  }
//});
//
//
//server.route({
//  method: 'POST',
//  path: '/login',
//  handler: function(request, reply) {
//    return reply("login successful");
//  },
//  config: {
//      validate: {
//        payload: Joi.object({
//            isGuest: Joi.boolean(),
//            username:Joi.string().when("isGuest", {is: false, then: Joi.required(), otherwise: Joi.forbidden()}),
//            accessToken: Joi.string().token(),
//            password: Joi.string().alphanum(),
//          })
//          .options({
//            allowUnknown: true
//          })
//          .without('accessToken', 'password')
//      }
//    }
//});
//
//server.route({
//  method: 'GET',
//  path: '/chickens/{breed}',
//  handler: function(request, reply) {
//    return reply("Type of chicken: " + request.params.breed);
//  },
//  config: {
//    validate: {
//      params: {
//        breed: Joi.string().required()
//      }
//    }
//  }
//});
//server.route({
//    method: 'GET',
//    path: '/proxy',
//    handler: (request, reply) => {
//      console.log("Got request from: ", request.info.host);
//      if (request.info.host.split(":")[1] == "65535") {
//        return reply("Hello Proxy");
//      } else {
//        reply.proxy({
//          host: 'localhost',
//          port: '65535'
//        }); 
//      }
//      
//    }
//});

//server.route({
//  method: 'GET',
//  path: '/pic',
//  handler: {
//    file: './public/sriyantra.png'
//  }
//});


// *********************** Start the Server *************************
server.start(function (err) {
  if (err) {
    throw err;
  }
  console.log('Main server running at:', server.connections[0].info.uri)
    //  console.log('Proxy server running at:', server.connections[1].info.uri)
});