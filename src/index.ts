import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnection from './config/database';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// configuring cors
app.use(  
  cors({ 
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);  


// app.use("*", notFound);


// connecting to database
dbConnection();

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});