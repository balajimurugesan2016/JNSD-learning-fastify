'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const { PORT = 3000 } = process.env

router.get('/', (req, res) => {
  const {un} = req.query;

  if(Array.isArray(un)){
setTimeout(() => {

 un.forEach((data,index) => {
    
    un[index].toUpperCase()

  })

  res.send(un)
  
}, 1000);
  

  }
  else{
    setTimeout(() => {
      res.send((un || '').toUpperCase())
    }, 1000)
  }
 
})

app.use(router)

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})