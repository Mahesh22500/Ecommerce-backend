import { Cart } from "../models/Cart.js";

export const addItemToCart = async (req, res) => {
  try {
    const item = new Cart(req.body);

    let doc = await item.save();
    const newDoc = await doc.populate({
      path: "product",
    });

    res.status(201).json(newDoc);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const fetchCartByUser = async (req, res) => {
  try {
    const { user } = req.query;
    const doc = await Cart.find({ user: user })
      .populate("user")
      .populate("product");
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateCart = async (req, res) => {
  // console.log("I am inside updateCart ");
  try {
    const { id } = req.params;
    // console.log("id", id);

    // console.log("body", req.body);

    const doc = await Cart.findByIdAndUpdate(id, req.body, { new: true })
      .populate("user")
      .populate("product");

    // const doc = await Cart.findById(id);

    // console.log("doc", doc);

    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Cart.findByIdAndDelete(id, { new: true });
    if (doc) res.status(200).json(doc);
    else res.status(400).json("item does not exist");
  } catch (err) {
    res.status(400).json(err);
  }
};
