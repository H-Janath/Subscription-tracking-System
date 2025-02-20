import express from "express";
import {PORT} from "./config/env.js";
import subscriptionRouter from './routes/subscription.routes.js'
import authRouter from './routes/auth.routes.js'
import useRouter from "./routes/user.routes.js";
import connectToDatabase from './database/mongodb.js'
const app = express();

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',useRouter);
app.use('/api/v1/subscriptions',subscriptionRouter)

app.get('/',(req,res)=>{
    res.send('Welcome to the Subscription Tracker API!');
})

app.listen(PORT,()=>{
    connectToDatabase()
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
})

export default app;