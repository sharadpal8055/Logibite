import { MapPin, Clock3, Star } from "lucide-react";

function RestaurantBanner({ restaurant }) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <img
            src={
              restaurant.image ||
              "https://placehold.co/1200x500?text=Restaurant"
            }
            alt={restaurant.name}
            className="w-full h-[350px] object-cover"
          />

          <div className="p-10">

            <h1 className="text-5xl font-black">
              {restaurant.name}
            </h1>

            <p className="text-gray-500 mt-4">
              {restaurant.description ||
                "Fresh delicious food delivered fast."}
            </p>

            <div className="flex flex-wrap gap-8 mt-8">

              <div className="flex items-center gap-2">
                <Star className="text-yellow-500 fill-yellow-500" />
                <span>{restaurant.rating}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 />
                <span>{restaurant.deliveryTime} mins</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin />
                <span>{restaurant.city}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default RestaurantBanner;