import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose  from 'mongoose';
import uri from './config/database';
import userRouter from './routes/user';
dotenv.config();

const port = process.env.PORT || 8000;

// Create Express app
const app = express();

// Connect to the MongoDB database using Mongoose
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

//Allow Cors
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.json());


// user routes
app.use('/api/user', userRouter);

// Define routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


