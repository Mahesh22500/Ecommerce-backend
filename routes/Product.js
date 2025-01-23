import express from 'express'
import { fetchProducts,createProduct, deleteProduct, updateProduct, fetchProductById, createMultipleProducts } from '../controllers/Product.js';


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

const router = express.Router();


router.get('/',fetchProducts).post("/all",auth,createMultipleProducts).get("/:id",fetchProductById).post('/',auth,createProduct).delete('/:id',auth,deleteProduct).patch('/:id',auth,updateProduct)


export default router 