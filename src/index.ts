import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnection from './config/database';
import { errorHandler } from './error/errorHandler';
import userRouter from './routes/user.routes';
import todoRouter from './routes/todo.routes';
import notFound from './utils/404';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// configuring cors
app.use(  
  cors({ 
    origin: [process.env.ORIGIN_URL as string],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);  


// routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/todo', todoRouter)


app.use("*", notFound);

// golbal error handler
app.use(errorHandler);

// connecting to database
dbConnection();

app.listen(8001, () => { 
  console.log(`Server is running at http://localhost:8001`);
});