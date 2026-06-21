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
deliveryAddress: {
  fullName: String,

  phone: String,

  houseNumber: String,

  street: String,

  landmark: String,

  city: String,

  state: String,

  pincode: String,

  addressType: String,
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
razorpayOrderId: {
  type: String,
},

razorpayPaymentId: {
  type: String,
},

razorpaySignature: {
  type: String,
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
    statusTimeline: [
  {
    status: {
      type: String,
    },

    time: {
      type: Date,
      default: Date.now,
    },
  },
],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);