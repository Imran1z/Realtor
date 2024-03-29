import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.router.js'


//changes
import cors from 'cors'
// Allow requests from a specific origin
const corsOptions = {
  origin: 'https://househaven-k1n3.onrender.com/',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};



import url from 'url';
import path from 'path'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app= express();
app.use(express.json());
app.use(cookieParser());
// Use the CORS middleware with custom options
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to Mongodb')
    app.listen(process.env.PORT,()=>{
        console.log('Server is up and running on port:',process.env.PORT)
    })
}).catch((err)=>{
    console.log(err)
})

// app.use(express.static(path.join(__dirname,'/client/dist')));
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'client','dist','index.html'))
// })
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

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
