import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';

import dbConnect from './database/dbConnect.js';
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import salesRouter from './routes/salesRouter.js'

import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

const app = express();


// Configurations
dotenv.config()
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true, }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(fileUpload());
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRECT
})

// Database connection
const url = process.env.MONGO_URL;
dbConnect(url);


// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/sales', salesRouter);


// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server listening on ${PORT} 😁`));