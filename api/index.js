import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";

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
//  mongodb 这么一连，那么里面 schema 产出的对象就时刻存在于此 project 里面了 就等于此工程里面，多了user 和 listing 两个对象。

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

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
//  next 就表示此中间件功能已经完成，接下来执行下一个中间件。如果下面的代码真的有中间件的话，那么往往此中间件代码块最后要写一个next()；如果需要传参的话next()里要写一个参数。
