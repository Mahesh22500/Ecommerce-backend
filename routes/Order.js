import express from 'express'
import { createOrder, deleteOrder, fetchAllOrders, updateOrder } from '../controllers/Order.js';



const router = express.Router();



router.post("/",createOrder).get("/",fetchAllOrders).patch("/:id",updateOrder).delete("/:id",deleteOrder)


export const orderRouter = router