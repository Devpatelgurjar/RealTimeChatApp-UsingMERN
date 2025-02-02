import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const DB_URL = process.env.DB_URL;
        if (!DB_URL) {
            throw new Error('DB_URL is not defined. Check your environment variables.');
        }
        const db = await mongoose.connect(DB_URL);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};

export default connectDB;
