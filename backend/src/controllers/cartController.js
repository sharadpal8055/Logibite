import Cart from "../models/Cart.js";
import Food from "../models/Food.js";
import calculateCart from "../utils/calculateCart.js";

/* ==========================================
   Add To Cart
========================================== */

export const addToCart = async (req, res) => {
  try {
    const { foodId, quantity = 1 } = req.body;
if (
  !Number.isInteger(quantity) ||
  quantity < 1
) {
  return res.status(400).json({
    success: false,
    message: "Invalid quantity",
  });
}
    const food = await Food.findById(foodId);


    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    if (!food.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Food is currently unavailable",
      });
    }

    if (food.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${food.stock} items available`,
      });
    }

    const existingItem = await Cart.findOne({
      user: req.userId,
      food: foodId,
    });

    if (existingItem) {
      existingItem.quantity += quantity;

      if (existingItem.quantity > food.stock) {
        return res.status(400).json({
          success: false,
          message: `Maximum available quantity is ${food.stock}`,
        });
      }

      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart: existingItem,
      });
    }

    const cart = await Cart.create({
      user: req.userId,
      food: foodId,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Item added to cart",
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ==========================================
   Get Cart
========================================== */

export const getUserCart = async (req, res) => {
  try {

    const cart = await Cart.find({
      user: req.userId,
    })
      .populate("food")
      .populate({
        path: "food",
        populate: {
          path: "restaurant",
        },
      });

    const totals = calculateCart(cart);

    res.status(200).json({
      success: true,
      totalItems: cart.length,
      cart,
      pricing: totals,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ==========================================
   Update Quantity
========================================== */

export const updateCartQuantity =
  async (req, res) => {

    try {

      const { quantity } = req.body;

      if (
  !Number.isInteger(quantity) ||
  quantity < 1
) {
  return res.status(400).json({
    success: false,
    message: "Invalid quantity",
  });
}

      const cartItem =
        await Cart.findById(req.params.id)
          .populate("food");

      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: "Cart item not found",
        });
      }

      if (
        cartItem.user.toString() !==
        req.userId
      ) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }

      if (
        quantity >
        cartItem.food.stock
      ) {
        return res.status(400).json({
          success: false,
          message: `Only ${cartItem.food.stock} available`,
        });
      }

      cartItem.quantity = quantity;

      await cartItem.save();

    const updatedCart =
  await Cart.findById(cartItem._id)
    .populate("food");

return res.status(200).json({
  success: true,
  message: "Quantity updated",
  cartItem: updatedCart,
});

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

/* ==========================================
   Remove Item
========================================== */

export const removeCartItem =
  async (req, res) => {

    try {

      const cart =
        await Cart.findById(req.params.id);

      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart item not found",
        });
      }

      if (
        cart.user.toString() !==
        req.userId
      ) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }

      await cart.deleteOne();

      res.status(200).json({
        success: true,
        message: "Item removed successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

/* ==========================================
   Clear Cart
========================================== */

export const clearCart =
  async (req, res) => {

    try {

      await Cart.deleteMany({
        user: req.userId,
      });

      res.status(200).json({
        success: true,
        message: "Cart cleared successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };