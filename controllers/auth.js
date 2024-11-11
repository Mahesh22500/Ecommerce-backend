import { User } from "../models/User.js";

export const createUser = async (req, res) => {
  // console.log("Inside createUser");
  // console.log("req.body", req.body);

  try {
    const user = new User(req.body);

    const doc = await user.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const checkUser = async (req, res) => {
  // console.log("Inside check User ");
  // console.log("req body", req.body);
  const email = req.body.email;
  try {
    const doc = await User.findOne({ email: email });

    if (doc && doc.password == req.body.password) {
      res.status(200).json(doc);
    } else {
      res.status(401).json({message:"wrong credentials"});
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
