


require('dotenv').config()
require('./db/connection')

const express=require('express')

const router =require('./routes/routes')

const jwt=require('jsonwebtoken')

const server=express()

const port=5000

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });



server.use(express.json())

server.use(router)





server.listen(5000,()=>{
    console.log('server listening on the port '+port);
})
