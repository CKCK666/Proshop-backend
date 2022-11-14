import express from 'express';
import dotenv from 'dotenv';
import path from "path"
import colors from 'colors';
import cors from "cors"
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
// import uploadRoutes from './routes/uploadRoutes';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();
const app = express();
connectDB();
app.use(express.json());
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/upload', uploadRoutes);
app.get("/api/config/paypal",(req,res)=>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
app.use(notFound);
app.use(errorHandler);

const __dirname=path.resolve()
app.use("/uploads",express.static(path.join(__dirname,"/uploads")))

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server is on ${process.env.NODE_ENV} running on ${PORT}..........................`
  )
);
