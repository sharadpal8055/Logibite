import crypto from "crypto";
import razorpay from "../services/payment/razorpayService.js";
import buildOrderFromCart
from "../utils/buildOrderFromCart.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Restaurant from "../models/Restaurant.js";
import Food from "../models/Food.js";
import calculateCart from "../utils/calculateCart.js";
import Address from "../models/Address.js";
// ======================
// COD ORDER
// ======================
// ======================
// PLACE COD ORDER
// ======================

export const placeCODOrder = async (req, res) => {
  try {

    const {
      restaurant,
      items,
      pricing,
      cart,
    } = await buildOrderFromCart(req.userId);
const address =
await Address.findOne({
    user:req.userId,
    isDefault:true
});

if(!address){
    return res.status(400).json({
        success:false,
        message:"Please add a delivery address."
    });
}
    const order = await Order.create({
      user: req.userId,

      restaurant: restaurant._id,

      items,
deliveryAddress:{
    fullName:address.fullName,

    phone:address.phone,

    houseNumber:address.houseNumber,

    street:address.street,

    landmark:address.landmark,

    city:address.city,

    state:address.state,

    pincode:address.pincode,

    addressType:address.addressType,
},
      totalAmount: pricing.total,

      paymentMethod: "COD",

      paymentStatus: "Pending",

      orderStatus: "Placed",
      

statusTimeline: [
  {
    status: "Placed",
  },
],
    });

    /* ===========================
       Reduce Stock
    =========================== */

   /* ===========================
   Reduce Stock (Safe)
=========================== */

for (const item of cart) {

  const updatedFood =
    await Food.findOneAndUpdate(
      {
        _id: item.food._id,
        stock: {
          $gte: item.quantity,
        },
      },
      {
        $inc: {
          stock: -item.quantity,
        },
      },
      {
        new: true,
      }
    );

  if (!updatedFood) {
    throw new Error(
      `${item.food.name} is out of stock`
    );
  }

}

    /* ===========================
       Clear Cart
    =========================== */

    await Cart.deleteMany({
      user: req.userId,
    });

    res.status(201).json({
      success: true,

      message:
        "Order placed successfully",

      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================
// CREATE RAZORPAY ORDER
// ======================
// ======================
// CREATE RAZORPAY ORDER
// ======================

export const createRazorpayOrder = async (
  req,
  res
) => {
  try {

    const {
      restaurant,
      items,
      pricing,
    } = await buildOrderFromCart(
      req.userId
    );
const address =
await Address.findOne({
    user:req.userId,
    isDefault:true
});

if(!address){
    return res.status(400).json({
        success:false,
        message:"Please add a delivery address."
    });
}
    const razorpayOrder =
      await razorpay.orders.create({
        amount: Math.round(
          pricing.total * 100
        ),
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      });

    const order = await Order.create({
      user: req.userId,

      restaurant: restaurant._id,

      items,
      deliveryAddress:{
    fullName:address.fullName,

    phone:address.phone,

    houseNumber:address.houseNumber,

    street:address.street,

    landmark:address.landmark,

    city:address.city,

    state:address.state,

    pincode:address.pincode,

    addressType:address.addressType,
},

      totalAmount: pricing.total,

      paymentMethod: "Razorpay",

      paymentStatus: "Pending",

    orderStatus: "Placed",

statusTimeline: [
  {
    status: "Placed",
  },
],

      razorpayOrderId:
        razorpayOrder.id,
    });

    res.status(200).json({
      success: true,

      order,

      razorpayOrder,

    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ======================
// VERIFY PAYMENT
// ======================
export const verifyPayment = async (
  req,
  res
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          razorpay_order_id +
            "|" +
            razorpay_payment_id
        )
        .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

   const order =
await Order.findOneAndUpdate(
{
    razorpayOrderId:
    razorpay_order_id
},
{
    paymentStatus:"Paid",

    orderStatus:"Preparing",

    razorpayPaymentId:
    razorpay_payment_id,

    razorpaySignature:
    razorpay_signature
},
{
    new:true
}
);

    res.status(200).json({
      success: true,
      message: "Payment Verified",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================
// CHECKOUT
// ======================

// ======================
// CHECKOUT
// ======================

export const checkout = async (req, res) => {
  try {

    const {
      restaurant,
      items,
      pricing,
      cart,
    } = await buildOrderFromCart(
      req.userId
    );

    const address =
      await Address.findOne({
        user: req.userId,
        isDefault: true,
      });

    return res.status(200).json({
      success: true,

      canCheckout: true,

      restaurant: {
        _id: restaurant._id,
        name: restaurant.name,
        image: restaurant.image,
        address: restaurant.address,
        city: restaurant.city,
        deliveryTime:
          restaurant.deliveryTime,
      },

      items,

      pricing,

      deliveryAddress: address,

      totalItems: cart.length,
    });

  } catch (error) {

    let statusCode = 500;

    if (
      error.message === "Cart is empty" ||
      error.message.includes("Restaurant") ||
      error.message.includes("available") ||
      error.message.includes("unavailable") ||
      error.message.includes(
        "only one restaurant"
      )
    ) {
      statusCode = 400;
    }

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });

  }
};


// ======================
// USER ORDERS
// ======================
export const getUserOrders = async (
  req,
  res
) => {
  try {
    const orders = await Order.find({
      user: req.userId,
    })
      .populate("restaurant")
      .populate("items.food")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// GET SINGLE ORDER
// ======================

export const getOrderById = async (
  req,
  res
) => {
  try {

    const order =
      await Order.findById(
        req.params.id
      )
        .populate("restaurant")
        .populate("items.food");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      order.user.toString() !==
      req.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
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
// ======================
// CANCEL ORDER
// ======================

export const cancelOrder = async (
  req,
  res
) => {
  try {

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      order.user.toString() !==
      req.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (
      order.orderStatus === "Picked Up" ||
      order.orderStatus === "On The Way" ||
      order.orderStatus === "Delivered" ||
      order.orderStatus === "Cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Order cannot be cancelled",
      });
    }

    order.orderStatus = "Cancelled";
order.statusTimeline.push({
  status: "Cancelled",
});
    await order.save();

    res.status(200).json({
      success: true,
      message:
        "Order cancelled successfully",
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ======================
// UPDATE ORDER STATUS
// ======================
// ======================
// UPDATE ORDER STATUS
// ======================
// ======================
// VALID STATUS TRANSITIONS
// ======================

const validTransitions = {
  Placed: ["Preparing", "Cancelled"],

  Preparing: [
    "Picked Up",
    "Cancelled",
  ],

  "Picked Up": [
    "On The Way",
  ],

  "On The Way": [
    "Delivered",
  ],

  Delivered: [],

  Cancelled: [],
};

// ======================
// UPDATE ORDER STATUS
// ======================

export const updateOrderStatus = async (
  req,
  res
) => {
  try {

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const newStatus =
      req.body.orderStatus;

    const allowedStatuses =
      validTransitions[
        order.orderStatus
      ];

    if (
      !allowedStatuses.includes(
        newStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message: `Cannot change order from ${order.orderStatus} to ${newStatus}`,
      });
    }

    order.orderStatus =
      newStatus;

    order.statusTimeline.push({
      status: newStatus,
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