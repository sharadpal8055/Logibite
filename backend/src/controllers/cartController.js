import Cart from "../models/Cart.js";


export const addToCart = async (req, res) => {
  try {
    const { foodId, quantity } = req.body;

    const cart = await Cart.create({
      user: req.userId,
      food: foodId,
      quantity,
    });

    res.status(201).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.userId,
    }).populate("food");

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const removeCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Item removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
