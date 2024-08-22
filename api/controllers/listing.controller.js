import Listing from "../models/listing.models.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findbyId(req.param.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef.toString()) {
    return next(errorHandler(404, "You can only delete your own listings!"));
  }

  try {
    await Listing.findbyIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findbyId(req.params.id);
  // findbyId 找的是 mongodb 自动给每跟对象数据存生成的 ID
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    // req.user.id 是 cookie 里面存的用户id；
    return next(errorHandler(401, "You can only update your own listings!"));
  }
  try {
    const updatedListing = await Listing.findbyIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
