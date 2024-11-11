import express from "express";

import {
  deleteUser,
  fetchAllUsers,
  fetchUserById,
  updateUser,
} from "../controllers/User.js";

const router = express.Router();

router
  .get("/", fetchAllUsers)
  .get("/:id", fetchUserById)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);

export const userRouter = router;
