import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectcloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import createAdmin from './config/createAdmin.js';
import aiRouter from './routes/aiRoute.js';

//app config
const app = express();
const port = process.env.PORT || 4000;

try {

    await connectDB();

    connectcloudinary();

    await createAdmin();

} catch (error) {

    console.error("Startup Error:", error);

    process.exit(1);
}

//middlewares
app.use(express.json());

// to connect frontend with backend
app.use(cors());

// API endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api/ai', aiRouter);

app.get('/', (req, res) => {
    res.send('API working working');
});

app.listen(port, () => {
    console.error('server started at', port);
});