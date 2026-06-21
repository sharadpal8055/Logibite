import Cart from "../models/Cart.js";
import Restaurant from "../models/Restaurant.js";
import calculateCart from "./calculateCart.js";

const buildOrderFromCart = async (userId) => {

  const cart = await Cart.find({
    user: userId,
  }).populate({
    path: "food",
    populate: {
      path: "restaurant",
    },
  });

  if (cart.length === 0) {
    throw new Error("Cart is empty");
  }

  const restaurantIds = new Set();

  const items = [];

  for (const cartItem of cart) {

    const food = cartItem.food;

    if (!food) {
      throw new Error("Food not found");
    }

    if (!food.isAvailable) {
      throw new Error(`${food.name} unavailable`);
    }

    if (cartItem.quantity > food.stock) {
      throw new Error(
        `Only ${food.stock} ${food.name} available`
      );
    }

    restaurantIds.add(
      food.restaurant._id.toString()
    );

    items.push({
      food: food._id,
      quantity: cartItem.quantity,
      price: food.price,
    });
  }

  if (restaurantIds.size > 1) {
    throw new Error(
      "You can order from only one restaurant."
    );
  }

  const restaurant =
    await Restaurant.findById(
      [...restaurantIds][0]
    );

  if (!restaurant) {
    throw new Error(
      "Restaurant not found"
    );
  }

  if (!restaurant.isOpen) {
    throw new Error(
      "Restaurant is currently closed"
    );
  }

  const pricing =
    calculateCart(cart);

  return {

    restaurant,

    items,

    pricing,

    cart,

  };

};

export default buildOrderFromCart;