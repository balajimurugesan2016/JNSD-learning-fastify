'use strict'
 const {Promisify, promisify} = require('util')
 const {boat} = require('../../model');
 const create = promisify(boat.create);
 const read = promisify(boat.read);
 const del = promisify(boat.del);

module.exports = async function (fastify, opts) {

   const scheme = {
       body:{
           required:['data'],
           type:'object',
           properties:{
              data:{

              required:['brand','color'],
               type:'object',
               properties:{

                brand:{type:'string'},
                color:{type:'string'}

               }
            }

           }
       }
   }

  fastify.post('/',{schema:scheme} ,async function (request, reply) {

    try{

    const {data} = request.body
    const iden = model.uid()
    reply.statusCode = 201;
    await create(iden,data);

}
catch(e){
    if(e.message === 'resource exists'){

        fastify.httpErrors.badRequest();

    }

    return e;

}

  })


  fastify.get('/:id', async function (request, reply) {

    try{

    const {id} = request.params
   
    reply.send(await read(id));
}
catch(e){
    if(e.message === 'not found'){

        fastify.httpErrors.notFound()

    }

    return e;

}

  })


  fastify.delete('/:id', async function (request, reply) {

    try{

    const {id} = request.params

    reply.statusCode = 204;
   
    await del(iden);

}
catch(e){
    if(e.message === 'not found'){

        fastify.httpErrors.notFound()

    }

    return e;

}

  })

  




}
