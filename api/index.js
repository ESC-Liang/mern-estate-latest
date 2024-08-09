import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.route.js";

mongoose
  .connect(
    "mongodb+srv://sean:sean@mern-estatelatest.6kpuy.mongodb.net/?retryWrites=true&w=majority&appName=mern-estatelatest"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
