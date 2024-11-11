import express from "express";
import {
  addItemToCart,
  deleteFromCart,
  fetchCartByUser,
  updateCart,
} from "../controllers/Cart.js";

const router = express.Router();

router
  .post("/", addItemToCart)
  .get("/", fetchCartByUser)
  .patch("/:id", updateCart)
  .delete("/:id", deleteFromCart);


  export const cartRouter = router 