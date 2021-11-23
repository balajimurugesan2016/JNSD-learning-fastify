'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const fastifystatic = require('fastify-static')
module.exports = async function (fastify, opts) {
  
  
  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public')
    
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  fastify.setNotFoundHandler({
    preValidation: (req, reply, done) => {
      // your code
      done()
    },
    preHandler: (req, reply, done) => {
      // your code
      done()
    }
  }, function (request, reply) {
      

     if(request.routePath !== '/hello' || request.routePath !== '/' ){

      reply.statusCode = 400;
      return "Not Found";
     }
     return "Not Found";
    //reply.notFound()

  })
}
