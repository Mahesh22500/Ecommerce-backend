import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  // console.log("Inside createUser");
  // console.log("req.body", req.body);

  try {
    const user = new User(req.body);
    const token = await jwt.sign(
      {
        email: req.body.email,
      },
      process.env.SECRET_KEY
    );

    console.log("token", token);

    user.token = token;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    console.log("hashedPassword", hashedPassword);

    user.password = hashedPassword;

    const doc = await user.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const checkUser = async (req, res) => {
  console.log("Inside check User ");
  console.log("req body", req.body);
  const email = req.body.email;
  try {
    const doc = await User.findOne({ email: email });

    console.log("doc in db:",doc);

    if (doc) {  
      const ok = await bcrypt.compare(req.body.password, doc.password);
      if (ok) {
        res.status(200).json(doc);
      } else res.status(400).json({ message: "Invalid credentials" });
    } else res.status(400).json({ message: "User does not exist" });
  } catch (err) {
    res.status(400).json(err);
  }
};
