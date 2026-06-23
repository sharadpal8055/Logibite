import { useEffect, useState } from "react";

import { Clock3, Star, Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { getRestaurants } from "../../services/restaurantService";


function FeaturedRestaurants() {
  const [restaurants, setRestaurants] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await getRestaurants();

      setRestaurants(res.data.restaurants);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <p className="text-orange-500 font-semibold uppercase">
              Restaurants
            </p>

            <h2 className="text-5xl font-black mt-2">Featured Restaurants</h2>
          </div>

          <button className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 duration-300">
            View All
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <Link
            key={restaurant._id}
    to={`/restaurants/${restaurant._id}`}
>
            <div
              key={restaurant._id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 duration-500 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    restaurant.image ||
                    "https://placehold.co/600x400?text=Restaurant"
                  }
                  alt={restaurant.name}
                  className="h-64 w-full object-cover group-hover:scale-110 duration-500"
                />

                <button
                  className="
                  absolute
                  top-5
                  right-5
                  bg-white
                  h-12
                  w-12
                  rounded-full
                  shadow-lg
                  flex
                  items-center
                  justify-center
                  hover:bg-red-500
                  hover:text-white
                  duration-300
                  "
                >
                  <Heart size={20} />
                </button>

                <div className="absolute top-5 left-5 bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow">
                  <Star size={18} className="text-yellow-500 fill-yellow-500" />

                  <span className="font-semibold">{restaurant.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold">{restaurant.name}</h3>

                <p className="text-gray-500 mt-2">
                  {restaurant.cuisineTypes.length
                    ? restaurant.cuisineTypes.join(", ")
                    : "Multi Cuisine"}
                </p>

                <div className="flex justify-between mt-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock3 size={18} />
                    {restaurant.deliveryTime} mins
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} />

                    {restaurant.city}
                  </div>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedRestaurants;
