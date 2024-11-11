import { Product } from "../models/Product.js";

export const createProduct = async (req, res) => {
  // console.log("Inside createProduct");
  try {
    const product = new Product(req.body);

    const doc = await product.save();

    res.status(200).json(doc);
  } catch (err) {
    // console.log("error", err);
    res.status(400).json(err);
  }
};

export const fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Product.findById(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const fetchProducts = async (req, res) => {
  // todo : sort, filter , pagination

  const { brand, category } = req.query;

  try {
    let query = Product.find({});

    if (brand) {
      // console.log("brand", brand);
      query = query.find({ brand: brand });
    }

    if (category) {
      // console.log("category", category);
      query = query.find({ category: category });
    }

    const doc = await query.exec();

    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  // console.log("product id ", id);
  try {
    const doc = await Product.findByIdAndDelete(id, { new: true });
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  // console.log("product id", id);

  try {
    const doc = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};


// export const fetchBrands = async(req,res)=>{

//    try{

//     const doc = await Product.find({});

//    }
// }