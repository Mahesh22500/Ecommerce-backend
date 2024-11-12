import express from 'express'
import { fetchProducts,createProduct, deleteProduct, updateProduct, fetchProductById, createMultipleProducts } from '../controllers/Product.js';

const router = express.Router();


router.get('/',fetchProducts).post("/all",createMultipleProducts).get("/:id",fetchProductById).post('/',createProduct).delete('/:id',deleteProduct).patch('/:id',updateProduct)


export default router 