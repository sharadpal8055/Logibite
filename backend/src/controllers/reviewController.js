import Review from "../models/Review.js";
import groq from "../services/ai/groqService.js";

import { reviewPrompt }
from "../prompts/reviewPrompt.js";
export const createReview = async (
  req,
  res
) => {
  try {
    const review =
      await Review.create({
        user: req.userId,
        food: req.body.food,
        restaurant:
          req.body.restaurant,
        rating: req.body.rating,
        comment: req.body.comment,
      });

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getFoodReviews =
  async (req, res) => {
    try {
      const reviews =
        await Review.find({
          food: req.params.foodId,
        }).populate(
          "user",
          "name"
        );

      res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const analyzeRestaurantReviews =
  async (req, res) => {
    try {
      const reviews =
        await Review.find({
          restaurant:
            req.params.restaurantId,
        });

      const reviewText =
        reviews
          .map(
            (review) =>
              review.comment
          )
          .join("\n");

      const completion =
        await groq.chat.completions.create(
          {
            model:
              process.env
                .GROQ_MODEL,

            messages: [
              {
                role: "user",

                content:
                  reviewPrompt(
                    reviewText
                  ),
              },
            ],
          }
        );

      res.status(200).json({
        success: true,

        totalReviews:
          reviews.length,

        analysis:
          completion.choices[0]
            .message.content,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };