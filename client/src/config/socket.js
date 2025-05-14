import socket from 'socket.io-client';

let socketInstance=null;

export const initializeSocket= (projectId)=>{
    socketInstance=new socket(import.meta.env.VITE_API_URL,{
        auth:{
            token:localStorage.getItem('token')
        },
        query:{
            projectId
        }
    })
    return socketInstance;
}

export const recieveMessage=(eventname,cb)=>{
    socketInstance.on(eventname,cb)
}

export const sendMessage=(eventname,data)=>{
    socketInstance.emit(eventname,data)
}