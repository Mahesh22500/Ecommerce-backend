import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path'

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

const auth = async (req, res, next) => {
  try {
    const header = req.get("Authorization");
    const token = header.split("Bearer ")[1];

    console.log("token", token);

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    if (decoded.email) next();
    else res.sendStatus(401);
  } catch (err) {
    console.log("err", err);
    res.status(400).json(err);
  }
};

const dir = import.meta.dirname

app.use(express.static(path.resolve(dir,"build")))

app.use(express.json());

app.use(cors());

app.use("/products", auth, productRouter);
app.use("/users", auth, userRouter);
app.use("/auth", authRouter);
app.use("/cart", auth, cartRouter);
app.use("/orders", auth, orderRouter);

app.listen(process.env.PORT, () => {
  console.log("listening on port ", process.env.PORT);
});
