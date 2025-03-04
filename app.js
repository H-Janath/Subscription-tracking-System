import express from "express";
import {PORT} from "./config/env.js";
import subscriptionRouter from './routes/subscription.routes.js'
import authRouter from './routes/auth.routes.js'
import useRouter from "./routes/user.routes.js";
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js'
import cookieParser from "cookie-parser";
import arcjetMiddleware from './middlewares/arcjet.middleware.js'
import workflowRouter from "./routes/workflow.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(arcjetMiddleware)
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',useRouter);
app.use('/api/v1/subscriptions',subscriptionRouter)
app.use('/api/v1/workflows',workflowRouter)


app.use(errorMiddleware);
app.get('/',(req,res)=>{
    res.send('Welcome to the Subscription Tracker API!');
})

app.listen(PORT,()=>{
    connectToDatabase()
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
})

export default app;