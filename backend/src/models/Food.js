import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    cuisine: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    preparationTime: {
      type: Number,
      default: 15,
    },

    tags: {
      type: [String],
      default: [],
    },
     restaurant: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Restaurant",
  required: true,
},
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model(
  "Food",
  foodSchema
);

export default Food;