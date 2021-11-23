'use strict'
const got = require('got');
 const { BOAT_SERVICE_PORT=4000, BRAND_SERVICE_PORT=5000 } = process.env;

const boatsrv = `http://localhost:${BOAT_SERVICE_PORT}`;
const brandsrv = `http://localhost:${BRAND_SERVICE_PORT}`;
module.exports = async function (fastify, opts) {
  const {notFound,badRequest} = fastify.httpErrors;
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params;
    try {
     
        const boat = await got(`${boatsrv}/${id}`,{ retry: { limit: 1 } }).json();
        const brand = await got(`${brandsrv}/${boat.brand}`,{ retry: { limit: 1 } }).json();
  
        //const [boat,brand] = await Promise.all([boatgot,brandgot]);
        //console.log(brand)
  
        return {
          id: boat.id,
          color: boat.color,
          brand: brand.name,
        };
        
   
    } catch (err) {
      if (!err.response) throw err;

      if (err.response.statusCode === 404) {
        throw notFound();
      }

      if (err.response.statusCode === 400) {
        throw badRequest();
      }

      throw err;
    }


  })
}
