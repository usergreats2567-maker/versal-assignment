import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import dotenv from "dotenv";

dotenv.config();


import app from './src/app.js';
import connectDB from './src/config/Db.js';


connectDB();

app.listen(3000,()=>{
console.log("Server is running at port 3000");

})