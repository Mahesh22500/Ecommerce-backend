import express from "express";
import mongoose from "mongoose";
import cors from 'cors'

import productRouter from "./routes/Product.js";
import { userRouter } from "./routes/User.js";
import { authRouter } from "./routes/auth.js";
import { cartRouter } from "./routes/Cart.js";
import { orderRouter } from "./routes/Order.js";

import "dotenv/config";

const app = express();

// // console.log("url",process.env.MONGO_URL)

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    // console.log("mongodb connected");   
  } catch (err) {
    // console.log(err);
  }
};

main();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors())

app.use("/products", productRouter);
app.use("/users",userRouter);
app.use("/auth",authRouter);
app.use("/cart",cartRouter);
app.use("/orders",orderRouter);

app.listen(process.env.PORT, () => {
  // console.log("listening on port ", process.env.PORT);
});
