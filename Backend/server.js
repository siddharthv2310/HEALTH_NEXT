import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectcloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import createAdmin from './config/createAdmin.js';

//app config
const app=express();
const port = process.env.PORT || 4000
connectDB()
connectcloudinary();
createAdmin();

//middlewares
             
app.use(express.json());
// to connect frontend with backend
app.use(cors());

// API endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get('/', (req,res)=>{
    res.send('API working working');
})

app.listen(port,(req,res)=>{
    console.log('server started at',port);
})
