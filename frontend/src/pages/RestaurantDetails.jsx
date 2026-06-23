import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getRestaurant } from "../services/restaurantService";
import { getRestaurantFoods } from "../services/foodService";

import RestaurantBanner from "../components/restaurant/RestaurantBanner";
import RestaurantMenu from "../components/restaurant/RestaurantMenu";

function RestaurantDetails() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurantDetails();
  }, [id]);

  const fetchRestaurantDetails = async () => {
    try {
      const [restaurantRes, foodsRes] = await Promise.all([
        getRestaurant(id),
        getRestaurantFoods(id),
      ]);

      setRestaurant(restaurantRes.data.restaurant);
      setFoods(foodsRes.data.foods);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className="h-[350px] rounded-3xl bg-gray-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <RestaurantBanner restaurant={restaurant} />

      <RestaurantMenu foods={foods} />
    </div>
  );
}

export default RestaurantDetails;