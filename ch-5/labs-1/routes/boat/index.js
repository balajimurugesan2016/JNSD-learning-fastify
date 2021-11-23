'use strict'
const { boat } = require('../../model')

module.exports = async function (fastify, opts) {
    fastify.get('/:id', async function (request, reply) {

        const { id } = request.params;

        boat.read(id, (err, data) => {

            if (err) {

                if (err.message === 'not found') {
                    reply.statusCode = 404;
                    reply.send(err.message)
                }

                reply.send(err)


            }
            reply.type('application/json');
            reply.send(data);

        })





    })
}
