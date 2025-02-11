


require('dotenv').config()
require('./db/connection')
const cors=require('cors')
const express=require('express')

const router =require('./routes/routes')

const jwt=require('jsonwebtoken')

const server=express()

const port=5000

server.use(
    cors({
      origin: 'https://aqua-abode-by-amal.netlify.app', 
      methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'verify-token'], 
    })
  );


server.use(express.json())

server.use(router)





server.listen(5000,()=>{
    console.log('server listening on the port '+port);
})
