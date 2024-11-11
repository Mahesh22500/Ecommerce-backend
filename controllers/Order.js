import { Order } from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const doc = await order.save();

    const newDoc = await doc.populate({
      path: "items",

      populate: {
        path: "product",
      },
    });

    res.status(201).json(newDoc);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const fetchAllOrders = async (req, res) => {
  try {
    const { user } = req.query;

    if (user) {
      const doc = await Order.find({ user: user }).populate({
        path: "items",
        populate: {
          path: "product",
        },
      });

      res.status(200).json(doc);
    } else {
      const doc = await Order.find({}).populate({
        path: "items",
        populate: {
          path: "product",
        },
      });
      res.status(200).json(doc);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// export const fetchOrdersByUser = async (req, res) => {
//   try {
//     const { user } = req.query;

//     // console.log("user", user);

//     const doc = await Order.find({ user: user }).populate({
//       path: "items",
//       populate: {
//         path: "product",
//       },
//     });

//     res.status(200).json(doc);
//   } catch (err) {
//     // console.log("err", err);
//     res.status(400).json(err);
//   }
// };

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate({
      path: "items",
      populate: {
        path: "product",
      },
    });

    res.status(200).json(doc);
  } catch (err) {
    res.status(401).json(err);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Order.findByIdAndDelete(id, { new: true });

    res.status(200).json(doc);
  } catch (err) {
    res.status(401).json(err);
  }
};
