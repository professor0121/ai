import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server,{
  cors:{
    origin:"*",
        methods: ['GET', 'POST'],

  }
});

//Socket Middleware for authenticating Socket User...
io.use( (socket, next) => {
  try {
    const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
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
  // socket.on('event', data => { /* … */ });
  // socket.on('disconnect', () => { /* … */ });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
})