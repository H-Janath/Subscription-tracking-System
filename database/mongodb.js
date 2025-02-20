import mongoose from 'mongoose'
import {DB_URL,NODE_ENV} from '../config/env.js'

const connectToDatabase = async ()=>{
    try {
        await mongoose.connect(DB_URL);;
        console.log(`Connect to the database in ${NODE_ENV} mode`);
    } catch (error) {
        console.log('Error connecting to database: ',error);
        process.exit(1);        
    }
} 

export default connectToDatabase