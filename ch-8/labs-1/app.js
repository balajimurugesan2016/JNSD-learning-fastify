'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const replyfrom = require('fastify-reply-from')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application

  fastify.register(replyfrom)
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
      // Default not found handler with preValidation and preHandler hooks
      if(request.routePath  !== '/' )
      {
        reply.notFound();
      }

      if(request.method !== 'GET'){
        reply.status = 405;
        return 'Method not allowed'
      }

      return 'not found'

  })


}
