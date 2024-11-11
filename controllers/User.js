
import { User } from "../models/User.js";



export const fetchAllUsers = async (req,res)=>{

  try{

    const doc = await User.find({});

    res.status(200).json(doc);
  }
  catch(err){

    res.status(400).json(err);
  }
}

export const fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("user id ",id);

    const doc = await User.findById(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await User.findByIdAndUpdate(id, req.body,{new:true});
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await User.findByIdAndDelete(id,{new:true});
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

