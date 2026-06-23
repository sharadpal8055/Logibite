import {
  Pizza,
  Sandwich,
  Soup,
  IceCream,
  Beef,
  Coffee,
} from "lucide-react";

const categories = [
  {
    title: "Pizza",
    icon: Pizza,
    color: "from-red-400 to-orange-400",
  },
  {
    title: "Burger",
    icon: Sandwich,
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Biryani",
    icon: Beef,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Chinese",
    icon: Soup,
    color: "from-green-400 to-emerald-500",
  },
  {
    title: "Desserts",
    icon: IceCream,
    color: "from-pink-400 to-rose-500",
  },
  {
    title: "Beverages",
    icon: Coffee,
    color: "from-indigo-400 to-purple-500",
  },
];

function Categories() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span
            className="
            text-orange-500
            font-semibold
            uppercase
            tracking-widest
            "
          >
            Explore
          </span>

          <h2
            className="
            mt-3
            text-5xl
            font-black
            "
          >
            Popular Categories
          </h2>

          <p
            className="
            mt-4
            text-gray-500
            max-w-2xl
            mx-auto
            "
          >
            Discover your favorite cuisines from
            thousands of restaurants across India.
          </p>

        </div>

        <div
          className="
          grid
          gap-8
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-6
          "
        >

          {categories.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="
                group
                cursor-pointer
                rounded-3xl
                bg-white
                shadow-lg
                hover:shadow-2xl
                duration-500
                hover:-translate-y-3
                overflow-hidden
                "
              >

                <div
                  className={`
                  h-40
                  flex
                  items-center
                  justify-center
                  bg-gradient-to-br
                  ${item.color}
                  `}
                >

                  <Icon
                    size={60}
                    className="
                    text-white
                    group-hover:scale-125
                    duration-500
                    "
                  />

                </div>

                <div className="p-6">

                  <h3
                    className="
                    font-bold
                    text-xl
                    text-center
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                    mt-2
                    text-gray-500
                    text-sm
                    text-center
                    "
                  >
                    120+ Restaurants
                  </p>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Categories;