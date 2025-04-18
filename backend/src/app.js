import express from 'express';
import {createServer} from 'node:http'
import {Server} from 'socket.io'
import mongoose from 'mongoose'
import {connectToSocket} from './controllers/socketmanager.js';

import cors from 'cors'

const app=express();
const server=createServer(app);
const io=connectToSocket(server); 

app.set("port",(process.env.port || 8000));

app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit: "40kb",extended:true}));

const start=async()=>{
    const connectionDb=await mongoose.connect("mongodb+srv://avinashjadhav2468:Pass1234@cluster0.n0udbe5.mongodb.net/");
    console.log(`MONGO CONNECTED Db Host:${connectionDb.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log("LISTEN ON PORT 8000")
    });
}

start();
