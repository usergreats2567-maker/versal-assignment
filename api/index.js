// api/index.js
import app from "../src/app.js";
import connectDB from "../src/config/Db.js";

await connectDB();

export default app;
