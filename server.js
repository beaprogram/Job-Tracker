const express= require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();

const connectDB=require('./config/db');
const authRoutes=require('./routes/auth');
const jobRoutes=require('./routes/jobs');

const app=express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/jobs',jobRoutes);

app.get('/',(req,res)=>{
    res.send('Job Tracker API Running!');
});

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});