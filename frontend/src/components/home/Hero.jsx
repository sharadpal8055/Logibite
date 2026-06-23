import {
  Search,
  ArrowRight,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute w-72 h-72 bg-orange-200 rounded-full blur-[120px] top-10 left-10 opacity-40"></div>

        <div className="absolute w-72 h-72 bg-red-200 rounded-full blur-[120px] bottom-0 right-0 opacity-40"></div>

      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}

          <div>

            <span
              className="
              inline-block
              bg-orange-100
              text-orange-600
              px-4
              py-2
              rounded-full
              font-semibold
              "
            >
              🍔 India's Smart Food Delivery
            </span>

            <h1
              className="
              mt-8
              text-5xl
              lg:text-7xl
              font-black
              leading-tight
              "
            >
              Delicious Food

              <span className="text-orange-500">

                {" "}
                Delivered

              </span>

              <br />

              To Your Door

            </h1>

            <p
              className="
              mt-8
              text-lg
              text-gray-600
              leading-8
              max-w-xl
              "
            >
              Order from thousands of restaurants,
              discover AI-powered recommendations,
              and enjoy lightning-fast delivery.
            </p>

            {/* Search */}

            <div
              className="
              mt-10
              bg-white
              rounded-2xl
              shadow-xl
              p-2
              flex
              "
            >
              <div className="flex items-center px-4">

                <Search className="text-gray-400" />

              </div>

              <input
                placeholder="Search food, restaurant..."
                className="
                flex-1
                outline-none
                px-3
                "
              />

              <button
                className="
                bg-orange-500
                hover:bg-orange-600
                text-white
                rounded-xl
                px-8
                py-3
                duration-300
                flex
                items-center
                gap-2
                "
              >
                Search

                <ArrowRight size={18} />

              </button>

            </div>

            {/* Categories */}

            <div className="flex flex-wrap gap-3 mt-8">

              {[
                "Pizza",
                "Burger",
                "Biryani",
                "Chinese",
                "Desserts",
                "South Indian",
              ].map((item) => (
                <button
                  key={item}
                  className="
                  bg-white
                  px-5
                  py-2
                  rounded-full
                  shadow
                  hover:bg-orange-500
                  hover:text-white
                  duration-300
                  "
                >
                  {item}
                </button>
              ))}

            </div>

            {/* Stats */}

            <div className="flex gap-12 mt-12">

              <div>
                <h2 className="text-4xl font-black">
                  500+
                </h2>

                <p className="text-gray-500">
                  Restaurants
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-black">
                  50K+
                </h2>

                <p className="text-gray-500">
                  Happy Customers
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-black">
                  4.9★
                </h2>

                <p className="text-gray-500">
                  Rating
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900"
              alt="Food"
              className="
              rounded-[40px]
              shadow-2xl
              object-cover
              h-[600px]
              w-full
              "
            />

            {/* Floating Card */}

            <div
              className="
              absolute
              top-8
              -left-6
              bg-white
              rounded-2xl
              shadow-xl
              p-5
              "
            >
              <p className="text-sm text-gray-500">
                Delivery
              </p>

              <h3 className="font-bold">
                20-25 mins
              </h3>
            </div>

            <div
              className="
              absolute
              bottom-8
              -right-6
              bg-white
              rounded-2xl
              shadow-xl
              p-5
              "
            >
              <p className="text-sm text-gray-500">
                Rating
              </p>

              <h3 className="font-bold">
                ⭐ 4.9
              </h3>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;