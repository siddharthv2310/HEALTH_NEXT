import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectcloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

//app config
const app=express();
const port = process.env.PORT || 4000
connectDB()
connectcloudinary();

//middlewares
             
app.use(express.json());
// to connect frontend with backend
app.use(cors());

// API endpoints
app.use('/api/admin',adminRouter)

app.get('/', (req,res)=>{
    res.send('API working working');
})

app.listen(port,(req,res)=>{
    console.log('server started at',port);
})
