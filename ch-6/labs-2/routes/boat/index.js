'use strict'
const { promisify } = require('util')
const { boat } = require('../../model')
const del = promisify(boat.del)
const read = promisify(boat.read)

module.exports = async function (fastify, opts) {
    const { notFound } = fastify.httpErrors;

    fastify.get('/:id', async function (request, reply) {
        const { id } = request.params;
        try {

            return await read(id);
        }
        catch (err) {

            if (err.message === 'not found') {


                throw notFound()

            }


            return err

        }


    })

    fastify.delete('/:id', async function (request, reply) {

        const { id } = request.params;
        console.log(id)

        try {

            reply.statusCode = 204;

            return await del(id);

        }
        catch (err) {

            if (err.message === 'not found') throw notFound();
            return err

        }



    })
}
