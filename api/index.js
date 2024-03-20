import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.router.js'
import path from 'path'

dotenv.config();
const __dirname = path.resolve();

const app= express();



app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})



app.use(express.json());
app.use(cookieParser());
// Use the CORS middleware with custom options

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to Mongodb')
    app.listen(process.env.PORT,()=>{
        console.log('Server is up and running on port:',process.env.PORT)
    })
}).catch((err)=>{
    console.log(err)
})

app.use('/api/v1/user',userRouter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/listing',listingRouter)




app.use((err, req, res, next)=>{
    const statusCode =err.statusCode || 500;
    const message =err.message ||'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})
