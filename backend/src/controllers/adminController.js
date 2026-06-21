import Order from "../models/Order.js";

/* ==========================================
   Get All Orders (Admin)
========================================== */

/* ==========================================
   Get All Orders (Admin)
========================================== */

export const getAllOrders = async (
  req,
  res
) => {
  try {

    const {
      orderStatus,
      paymentStatus,
      paymentMethod,
      page = 1,
      limit = 10,
      sort = "newest",
      search,
    } = req.query;

    const query = {};

    if (orderStatus) {
      query.orderStatus = orderStatus;
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    if (paymentMethod) {
      query.paymentMethod = paymentMethod;
    }

    let orders = await Order.find(query)
      .populate(
        "user",
        "name email"
      )
      .populate(
        "restaurant",
        "name city"
      )
      .populate(
        "items.food",
        "name price image"
      );

    // Search by customer name/email
    if (search) {
      const keyword = search.toLowerCase();

      orders = orders.filter((order) => {

        if (!order.user) return false;

        return (
          order.user.name
            .toLowerCase()
            .includes(keyword) ||

          order.user.email
            .toLowerCase()
            .includes(keyword)
        );

      });
    }

    // Sorting
    orders.sort((a, b) => {

      if (sort === "oldest") {
        return (
          a.createdAt -
          b.createdAt
        );
      }

      return (
        b.createdAt -
        a.createdAt
      );

    });

    // Pagination
    const totalOrders =
      orders.length;

    const start =
      (page - 1) * limit;

    const paginatedOrders =
      orders.slice(
        start,
        start + Number(limit)
      );

    res.status(200).json({
      success: true,

      totalOrders,

      currentPage:
        Number(page),

      totalPages:
        Math.ceil(
          totalOrders / limit
        ),

      orders:
        paginatedOrders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
/* ==========================================
   Get Single Order (Admin)
========================================== */

export const getOrderByIdAdmin = async (
  req,
  res
) => {
  try {

    const order =
      await Order.findById(
        req.params.id
      )
        .populate(
          "user",
          "name email"
        )
        .populate(
          "restaurant"
        )
        .populate(
          "items.food"
        );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
/* ==========================================
   Update Order Status (Admin)
========================================== */

export const updateOrderStatusAdmin = async (
  req,
  res
) => {
  try {

    const { orderStatus } = req.body;

    const validStatuses = [
      "Placed",
      "Preparing",
      "Picked Up",
      "On The Way",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order =
      await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    // Add to timeline
    order.statusTimeline.push({
      status: orderStatus,
      time: new Date(),
    });

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};