import { useEffect, useState } from "react";

import EmptyCart from "../components/cart/EmptyCart";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../services/cartService";

function Cart() {

  const [cart, setCart] = useState([]);

  const [pricing, setPricing] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {

    try {

      const res =
        await getCart();

      setCart(res.data.cart);

      setPricing(
        res.data.pricing
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const increaseQuantity =
    async (item) => {

     await updateCartItem(
  item._id,
  item.quantity + 1
);

   await   fetchCart();

    };

  const decreaseQuantity =
    async (item) => {

      if (
        item.quantity === 1
      ) {

        return;

      }

     await updateCartItem(
  item._id,
  item.quantity - 1
);

     await fetchCart();

    };

  const removeItem =
    async (item) => {

      await removeCartItem(
        item._id
      );

   await   fetchCart();

    };

  if (loading) {

    return (

      <div className="text-center py-32">

        Loading...

      </div>

    );

  }

  if (cart.length === 0) {

    return <EmptyCart />;

  }

  return (

    <section className="bg-gray-50 py-16">

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        grid
        lg:grid-cols-3
        gap-10
        "
      >

        <div className="lg:col-span-2">

          <h1
            className="
            text-4xl
            font-black
            mb-8
            "
          >
            Your Cart
          </h1>

          <div className="space-y-8">

            {cart.map((item) => (

              <CartItem
                key={item._id}
                item={item}
                onIncrease={
                  increaseQuantity
                }
                onDecrease={
                  decreaseQuantity
                }
                onRemove={
                  removeItem
                }
              />

            ))}

          </div>

        </div>

        <CartSummary
          pricing={pricing}
        />

      </div>

    </section>

  );

}

export default Cart;