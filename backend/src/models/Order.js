import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },

        quantity: Number,

        price: Number,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "Razorpay"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Preparing",
        "Picked Up",
        "On The Way",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);