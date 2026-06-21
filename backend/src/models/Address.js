import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    houseNumber: {
      type: String,
      required: true,
      trim: true,
    },

    street: {
      type: String,
      required: true,
      trim: true,
    },

    landmark: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    addressType: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/*
|--------------------------------------------------------------------------
| A user can save multiple addresses.
| Prevent exact duplicate addresses for the same user.
|--------------------------------------------------------------------------
*/

addressSchema.index(
  {
    user: 1,
    houseNumber: 1,
    street: 1,
    city: 1,
    pincode: 1,
  },
  {
    unique: true,
  }
);

const Address = mongoose.model(
  "Address",
  addressSchema
);

export default Address;