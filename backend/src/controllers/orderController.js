import crypto from "crypto";
import razorpay from "../services/payment/razorpayService.js";
import Order from "../models/Order.js";

// ======================
// COD ORDER
// ======================
export const placeCODOrder = async (req, res) => {
  try {
    const {
      restaurant,
      items,
      totalAmount,
    } = req.body;

    const order = await Order.create({
      user: req.userId,
      restaurant,
      items,
      totalAmount,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      orderStatus: "Placed",
    });

    res.status(201).json({
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
      totalAmount,
    } = req.body;

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const razorpayOrder =
      await razorpay.orders.create({
        amount: totalAmount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      });

    const order = await Order.create({
      user: req.userId,
      restaurant,
      items,
      totalAmount,
      paymentMethod: "Razorpay",
      paymentStatus: "Pending",
      orderStatus: "Placed",
      razorpayOrderId: razorpayOrder.id,
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
            razorpay_order_id,
        },
        {
          paymentStatus: "Paid",
          orderStatus: "Confirmed",
          razorpayPaymentId:
            razorpay_payment_id,
        },
        {
          new: true,
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
// UPDATE ORDER STATUS
// ======================
export const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          orderStatus:
            req.body.orderStatus,
        },
        {
          new: true,
        }
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