import Favorite from "../models/Favorite.js";
export const addFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.create({
      user: req.userId,
      food: req.body.foodId,
    });

    res.status(201).json({
      success: true,
      favorite,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.userId,
    }).populate("food");

    res.status(200).json({
      success: true,
      favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};