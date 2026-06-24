import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

dns.setServers(['8.8.8.8', '1.1.1.1']);

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb+srv://YtttT:7ajZzyytJmeEDlLc@yt-complete-backend.s5v1w2j.mongodb.net/Products?retryWrites=true&w=majority';

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB connected successfully');
    } catch (error) {
        console.error('DB connection error:', error.message);
        process.exit(1);
    }
}

export default connectDB;