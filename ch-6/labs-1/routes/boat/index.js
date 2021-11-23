'use strict'
const {promisify} = require('util');
const {boat} = require('../../model');
const read = promisify(boat.read);
const create = promisify(boat.create);

module.exports = async function (fastify, opts) {
    const { notfound } = fastify.httpErrors
    fastify.get('/:id', async function (request, reply) {
        const {id} = request.params;
        try{
    
            return await read(id);
        }
        catch(err){

            if(err.message === 'not found'){

                throw notfound()

            } 
            
            return err
    
        }
       
    
      })

  fastify.post('/', async function (request, reply) {
    const {data} = request.body;
    console.log(data);
    const iden = boat.uid()
    try{
        await create(iden,data);
        reply.statusCode = 201
        reply.type('application/json')
        reply.send({id:iden});
    }
    catch(err){
        
        reply.send(err)

    }
   

  })
}