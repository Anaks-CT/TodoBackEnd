import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnection from './config/database';
import { errorHandler } from './error/errorHandler';
import userRouter from './routes/user.routes';

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

// golbal error handler
app.use(errorHandler);

// routes
app.use('/api/v1/user', userRouter)

app.get('/', (req, res) => {
  console.log('hellow')
  res.send('Hello, this is the root route!');
}) 

// app.use("*", notFound);


// connecting to database
dbConnection();

app.listen(process.env.PORT, () => { 
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});