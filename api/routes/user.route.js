import express from "express";
import { test } from "../controllers/user.controller.js";
const UserRouter = express.Router();
import {
  updateUser,
  deleteUser,
  getUserListing,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyuser.js";

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListing);
router.get("/:id, verifyToken, getUser");
// 这里的路径上的变量 ：id 实际上到时候 由 fetch  具体来决定

export default router;
