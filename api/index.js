import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv/config"
import { error } from "node:console";

import dns from 'dns' 
import userRouter from "./routers/user.router.js";
dns.setServers(["1.1.1.1", "8.8.8.8"])

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log(error);
})
;

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use('/api/user', userRouter)