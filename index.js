


require('dotenv').config()
require('./db/connection')

const express=require('express')
const cors=require('cors')

const router =require('./routes/routes')

const jwt=require('jsonwebtoken')

const server=express()

const port=5000



server.use(cors())

server.use(express.json())

server.use(router)





server.listen(5000,()=>{
    console.log('server listening on the port '+port);
})
