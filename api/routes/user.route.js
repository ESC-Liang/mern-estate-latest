import express from "express";
import { test } from "../controllers/user.controller.js";
const UserRouter = express.Router();
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyuser.js";

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListing);

export default router;
