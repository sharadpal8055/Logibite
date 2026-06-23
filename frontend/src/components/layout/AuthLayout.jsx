import { Link } from "react-router-dom";

function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLinkText,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">

      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center px-20">

          <h1 className="text-6xl font-black text-orange-600">
            LogiBite
          </h1>

          <p className="mt-6 text-2xl font-semibold text-gray-700">
            Delicious food,
            <br />
            Delivered Faster.
          </p>

          <p className="mt-6 text-gray-500 leading-8 max-w-md">
            Discover thousands of restaurants,
            AI-powered recommendations,
            real-time tracking and secure ordering
            in one beautiful experience.
          </p>

          <div className="mt-12">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
              alt="Food"
              className="rounded-3xl shadow-2xl object-cover h-[420px]"
            />
          </div>

        </div>

        {/* Right Side */}

        <div className="flex justify-center items-center p-6">

          <div
            className="
            w-full
            max-w-md
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            shadow-2xl
            border
            border-white
            p-10
            "
          >
            <div className="text-center">

              <div className="text-6xl">
                🍔
              </div>

              <h2 className="text-4xl font-bold mt-4">
                {title}
              </h2>

              <p className="text-gray-500 mt-3">
                {subtitle}
              </p>

            </div>

            <div className="mt-10">

              {children}

            </div>

            <div className="mt-8 text-center">

              <span className="text-gray-500">
                {footerText}
              </span>

              <Link
                to={footerLink}
                className="
                ml-2
                font-semibold
                text-orange-600
                hover:text-orange-700
                "
              >
                {footerLinkText}
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;