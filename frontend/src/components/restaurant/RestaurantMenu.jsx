import { Star } from "lucide-react";
import { toast } from "react-toastify";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function RestaurantMenu({ foods }) {

  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
const navigate = useNavigate();


  const handleAddToCart = async (foodId) => {
  if (!isAuthenticated) {
    toast.info("Please login to add items to your cart.");

    setTimeout(() => {
      navigate("/login");
    }, 1000);

    return;
  }

  try {
    await addItem(foodId, 1);

    toast.success("Added to Cart");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};

  return (

    <section className="max-w-7xl mx-auto px-6 py-12">

      <h2 className="text-4xl font-black mb-10">
        Menu
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        {foods.map((food) => (

          <div
            key={food._id}
            className="bg-white rounded-3xl shadow-lg p-6 flex gap-5 hover:shadow-xl duration-300"
          >

            <img
              src={
                food.image ||
                "https://placehold.co/150x150?text=Food"
              }
              alt={food.name}
              className="h-32 w-32 rounded-2xl object-cover"
            />

            <div className="flex-1">

              <h3 className="text-2xl font-bold">
                {food.name}
              </h3>

              <p className="text-gray-500 mt-2">
                {food.description}
              </p>

              <div className="flex justify-between items-end mt-6">

                <div>

                  <p className="text-orange-500 font-bold text-xl">
                    ₹{food.price}
                  </p>

                  <div className="flex items-center gap-2 mt-2">

                    <Star
                      size={18}
                      className="text-yellow-500 fill-yellow-500"
                    />

                    <span>{food.rating}</span>

                  </div>

                </div>

                <button
                  onClick={() => handleAddToCart(food._id)}
                  className="
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    transition-all
                    duration-300
                    active:scale-95
                  "
                >
                  ADD
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>

  );
}

export default RestaurantMenu;