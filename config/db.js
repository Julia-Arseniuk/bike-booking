import mongoose from "mongoose";

const mongoURI = 'mongodb://127.0.0.1';
const dbName = 'bicycles_db';

const connectDB = async () => {
    try {
        await mongoose.connect(`${mongoURI}/${dbName}`);
    } catch (err) {
        console.error('err: ', err.message);
        process.exit(1);
    }
}

export default connectDB;