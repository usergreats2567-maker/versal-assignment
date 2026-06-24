import mongoose from 'mongoose';
// import dns from 'dns';
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// 'mongodb+srv://YtttT:7ajZzyytJmeEDlLc@yt-complete-backend.s5v1w2j.mongodb.net/Products?retryWrites=true&w=majority'



async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://YtttT:7ajZzyytJmeEDlLc@yt-complete-backend.s5v1w2j.mongodb.net/Products?retryWrites=true&w=majority', {
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