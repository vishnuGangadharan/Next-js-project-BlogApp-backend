import express from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import http from 'http'
import userRoutes from '../routes/userRoutes'



const app = express()
dotenv.config();
export const httpServer = http.createServer(app)
const corsOptions = {
    origin:  'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  };

  app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/user', userRoutes)
// app.use('/api/admin', adminRoutes)