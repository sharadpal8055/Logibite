import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "../components/layout/Layout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RestaurantDetails from "../pages/RestaurantDetails";

function AppRoutes() {
  return (
    <BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={2500}
      />

      <Routes>

        {/* Public Routes */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Common Layout */}

        <Route element={<Layout />}>

          <Route
            path="/"
            element={<Home />}
          />

        </Route>
<Route
    path="/restaurants/:id"
    element={<RestaurantDetails />}
 
/>
      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;