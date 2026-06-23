import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { useAuth } from "./AuthContext";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../services/cartService";

const CartContext = createContext();

export const CartProvider = ({
  children,
}) => {

  const { isAuthenticated } =
    useAuth();

  const [cart, setCart] =
    useState([]);

  const [pricing, setPricing] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const fetchCart =
    useCallback(async () => {

      if (!isAuthenticated) {
        setCart([]);
        setPricing({});
        return;
      }

      try {

        setLoading(true);

        const res =
          await getCart();
console.log(res)
        setCart(
          res.data.cart || []
        );

        setPricing(
          res.data.pricing || {}
        );

      } catch (error) {

        console.log(error);

        setCart([]);
        setPricing({});

      } finally {

        setLoading(false);

      }

    }, [isAuthenticated]);

  useEffect(() => {

    fetchCart();

  }, [fetchCart]);

  const addItem = async (
    foodId,
    quantity = 1
  ) => {
console.log("step1")
    await addToCart({
      foodId,
      quantity,
    });
console.log("step2")
    await fetchCart();
    console.log("step3")

  };

  const updateItem = async (
    id,
    quantity
  ) => {

    await updateCartItem(
      id,
      quantity
    );

    await fetchCart();

  };

  const removeItem = async (
    id
  ) => {

    await removeCartItem(id);

    await fetchCart();

  };

  const clearAll = async () => {

    await clearCart();

    await fetchCart();

  };

  const cartCount =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  return (

    <CartContext.Provider
      value={{
        cart,
        pricing,
        loading,
        cartCount,
        fetchCart,
        addItem,
        updateItem,
        removeItem,
        clearAll,
      }}
    >
      {children}
    </CartContext.Provider>

  );

};

export const useCart = () =>
  useContext(CartContext);