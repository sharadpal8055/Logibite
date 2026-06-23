import { useEffect, useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

import { addToCart } from "../../services/cartService";
import { getFoods } from "../../services/foodService";

function PopularFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await getFoods();
      setFoods(res.data.foods);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
const handleAddToCart = async (foodId) => {
  try {

    await addToCart({
      foodId,
      quantity: 1,
    });

    toast.success("Added to cart");

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to add item"
    );

  }
};


  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold mb-10">
            Popular Foods
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[1,2,3,4].map((item)=>(
              <div
                key={item}
                className="h-80 rounded-3xl bg-gray-200 animate-pulse"
              />
            ))}

          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-12">

          <div>

            <p className="text-orange-500 font-semibold">
              TRENDING
            </p>

            <h2 className="text-5xl font-black">
              Popular Foods
            </h2>

          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {foods.map((food)=>(

            <div
              key={food._id}
              className="
              rounded-3xl
              overflow-hidden
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              duration-300
              bg-white
              "
            >

              <img
                src={
                  food.image ||
                  "https://placehold.co/600x400?text=Food"
                }
                alt={food.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">

                <div className="flex justify-between">

                  <h3 className="font-bold text-xl">
                    {food.name}
                  </h3>

                  <span className="text-orange-500 font-bold">
                    ₹{food.price}
                  </span>

                </div>

                <p className="text-gray-500 mt-2">

                  {food.category}

                </p>

                <div className="flex justify-between items-center mt-6">

                  <div className="flex items-center gap-2">

                    <Star
                      size={18}
                      className="text-yellow-500 fill-yellow-500"
                    />

                    {food.rating}

                  </div>

                  <button
  onClick={() =>
    handleAddToCart(food._id)
  }
  className="
  bg-orange-500
  text-white
  h-11
  w-11
  rounded-full
  flex
  items-center
  justify-center
  hover:bg-orange-600
  duration-300
  "
>

                    <ShoppingCart size={20}/>

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default PopularFoods;