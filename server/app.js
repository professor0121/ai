
import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import aiRoutes from './routes/ai.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
// Connect to the database
connect();


app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.use('/user',userRoutes);
app.use('/project',projectRoutes)
app.use('/ai',aiRoutes)


export default app;