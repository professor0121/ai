// import Redis from  'ioredis';
// import dotenv from 'dotenv';
// dotenv.config();

// console.log(process.env.REDIS_HOST,process.env.REDIS_PORT,process.env.REDIS_PASSWORD)
// const redisClient=new Redis({
//     host:process.env.REDIS_HOST,
//     port:process.env.REDIS_PORT,
//     password:process.env.REDIS_PASSWORD
// })

// redisClient.on('connect',()=>{
//     console.log('Redis is connected')
// })

// export default redisClient;
import { createClient } from 'redis';

const redisClient = createClient({
  username: 'default', // Redis Cloud usually uses "default"
  password: 'wLAKFIt8vBLeVjciERNQY116MEgIwaMI',
  socket: {
    host: 'redis-13047.c241.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 13047,
    // reconnectStrategy: retries => {
    //   console.log(`🔁 Reconnecting to Redis... attempt #${retries}`);
    //   return Math.min(retries * 50, 2000); // retry delay
    // },
  },
});

redisClient.on('connect', () => {
  console.log('✅ Redis is connected');
});

// Important: Connect manually (as per redis v4+)
await redisClient.connect();

export default redisClient;
