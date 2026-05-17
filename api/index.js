import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv/config"
import webhookRouter from './routers/webhook.route.js'; // Adjust path to your router

import dns from 'dns' 
dns.setServers(["1.1.1.1", "8.8.8.8"])

import userRouter from "./routers/user.router.js";
import authRouter from "./routers/auth.route.js"

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log(error);
})
;

const app = express();

app.use(express.json())

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/webhooks', webhookRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})