import express from 'express';
import productRoutes from '../src/routes/product.route.js'

const app= express();
app.use(express.json());





// app.get("/",(req, res)=>{
//   res.json("Hello World")
// })

app.use("/api/products", productRoutes);





export default app;