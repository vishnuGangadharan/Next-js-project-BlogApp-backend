import express from 'express';
import connectToDb from './infrastructure/config/connectDb';
import { httpServer } from './infrastructure/config/app';


const app = express();
const port = process.env.PORT || 3008;

const startServer = async(): Promise<void> => {
    await connectToDb();
    const app =  httpServer;
    app.listen(port,()=>{
        console.log('server running :3008');
     })
 }
startServer()
