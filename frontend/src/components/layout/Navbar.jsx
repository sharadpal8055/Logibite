import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  User,
} from "lucide-react";

import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 20
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <header
      className={`
      fixed
      top-0
      left-0
      w-full
      z-50
      transition-all
      duration-300
      ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }
      `}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div
              className="
              h-12
              w-12
              rounded-2xl
              bg-gradient-to-r
              from-orange-500
              to-red-500
              flex
              items-center
              justify-center
              text-white
              text-2xl
              "
            >
              🍔
            </div>

            <div>

              <h1 className="font-black text-2xl">
                LogiBite
              </h1>

              <p className="text-xs text-gray-500">
                Eat Better.
              </p>

            </div>
          </Link>

          {/* Desktop */}

          <nav className="hidden lg:flex gap-8 font-medium">

            <Link to="/">Home</Link>

            <Link to="/restaurants">
              Restaurants
            </Link>

            <Link to="/orders">
              Orders
            </Link>

            <Link to="/profile">
              Profile
            </Link>

          </nav>

          {/* Search */}

          <div
            className="
            hidden
            lg:flex
            items-center
            bg-gray-100
            rounded-full
            px-4
            py-2
            w-80
            "
          >
            <Search size={18} />

            <input
              placeholder="Search food..."
              className="
              bg-transparent
              outline-none
              px-3
              w-full
              "
            />
          </div>

          {/* Right */}

          <div className="hidden lg:flex items-center gap-5">

            <button className="relative">

              <ShoppingCart
                size={26}
              />

              <span
                className="
                absolute
                -top-2
                -right-2
                bg-red-500
                text-white
                rounded-full
                text-xs
                h-5
                w-5
                flex
                items-center
                justify-center
                "
              >
                2
              </span>

            </button>

            <button
              className="
              h-11
              w-11
              rounded-full
              bg-orange-500
              text-white
              flex
              items-center
              justify-center
              "
            >
              <User />
            </button>

          </div>

          {/* Mobile */}

          <button
            className="lg:hidden"
            onClick={() =>
              setOpen(!open)
            }
          >
            {open ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>

        </div>

      </div>

      {open && (
        <div
          className="
          lg:hidden
          bg-white
          border-t
          "
        >
          <Link
            to="/"
            className="block p-5"
          >
            Home
          </Link>

          <Link
            to="/restaurants"
            className="block p-5"
          >
            Restaurants
          </Link>

          <Link
            to="/orders"
            className="block p-5"
          >
            Orders
          </Link>

          <Link
            to="/profile"
            className="block p-5"
          >
            Profile
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;