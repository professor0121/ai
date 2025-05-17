import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from './models/project.model.js';
import {generateResult} from './services/ai.service.js'

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST'],

  }
});

//Socket Middleware for authenticating Socket User...
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
    const projectId = socket.handshake.query.projectId;
    // console.log(projectId)
    if (!projectId) {
      return next(new Error("Project Id Is Required"))
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return next(new Error("Invalid Project Id"))
    }

    socket.project = await projectModel.findById(projectId);
    if (!token) {
      return next(new Error("Authentication Error"))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      return next(new Error("Authentication Error"))
    }

    socket.user = decoded;
    next();
  } catch (error) {
    console.log(error)
  }
})



io.on('connection', socket => {
  console.log("User Is Connected")
  socket.roomId=socket.project._id.toString()
  console.log(socket.roomId)

  socket.join(socket.roomId)
  // console.log(socket.project._id)

  socket.on('project-message',async data => {
    const message=data.message;
    const aiIsPresentInMessage=message.includes('@abhishek');
    if(aiIsPresentInMessage){
     const prompt =  message.replace("@abhishek",'');
     const result= await generateResult(prompt);

     io.to(socket.roomId).emit('project-message',{
      message:result,
      sender :{
        _id:'abhishek',
        email:"abhishek"
      }
     })

    }
    console.log(data)
    socket.broadcast.to(socket.roomId).emit('project-message', data)
  })


  socket.on('disconnect', () => { 
    console.log("User is Disconnected");
    socket.leave(socket.roomId)
   });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
})