import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">

      <ShoppingCart
        size={80}
        className="text-orange-500"
      />

      <h2 className="text-4xl font-bold mt-8">
        Your Cart is Empty
      </h2>

      <p className="text-gray-500 mt-4">
        Looks like you haven't added any food yet.
      </p>

      <Link
        to="/"
        className="
        mt-8
        bg-orange-500
        hover:bg-orange-600
        text-white
        px-8
        py-4
        rounded-xl
        "
      >
        Explore Restaurants
      </Link>

    </div>
  );
}

export default EmptyCart;