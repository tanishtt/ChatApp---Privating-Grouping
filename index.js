//const dotenv=require('dotenv').config();
const express= require('express');
const mongoose = require('mongoose');
const http= require('http');
const {Server}=require('socket.io');
const {connectMongoDB} =require('./connection');



const userRoutes= require('./routes/userRoutes')

const port =8080;

connectMongoDB('mongodb://127.0.0.1:27017/chatApp');

const app= express();

const server= http.createServer(app);

const io=new Server(server);



app.use('/',userRoutes);



server.listen(port,(err)=>{
    if(err){
        console.log("error : ",err);
        return;
    }
    console.log(`connected to server at port : ${port}`)
})
