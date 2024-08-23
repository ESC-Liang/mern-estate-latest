import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.models.js";

export const test = (req, res) => {
  res.json({
    message: "hello",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.param.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.prams.id)
    return next(errorHandler(401, "You can only delete your own account!"));

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (res, req, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
      // 这里用的是全局的错误处理器，处理的是 客户端和服务器交互时发生的错误，错误代码500 等。这里返回的信息是浏览器产生的信息。
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings"));
    // 这里用的是额外的错误处理器，处理的是客户端没有合法权限时发生的错误，错误代码401等，并且额外返回给客户一条信息。
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    // 这里的params 是到时候 由 fetch 发送 http 请求时 决定的。
    if (!user) return next(errorHandler(404, "User not found!"));

    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
