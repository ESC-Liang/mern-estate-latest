import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

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

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// 这是个中间件，意思是如果传入err这个参数，接下来会如何处理，那么
// 接下来就是先把err里面的 statusCode 和message 取出来，然后作为结果的一部分输出出去。
//  next 就表示这是一个中间件函数。中间件就是个函数，或者说回调函数，里面是需要传入参数的。
