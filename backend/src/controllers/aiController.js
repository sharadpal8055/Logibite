import groq from "../services/ai/groqService.js";
import Food from "../models/Food.js";

import { descriptionPrompt } from "../prompts/descriptionPrompt.js";

import  {reviewPrompt}  from "../prompts/reviewPrompt.js";

import { recommendationPrompt } from "../prompts/recommendationPrompt.js";

import { searchPrompt } from "../prompts/searchPrompt.js";

export const generateDishDescription = async (req, res) => {
  try {
    const { dishName } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: descriptionPrompt(dishName),
        },
      ],

      model: process.env.GROQ_MODEL,

      temperature: 0.7,
    });

    res.status(200).json({
      success: true,
      description: completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const analyzeReviews = async (req, res) => {
  try {
    const { reviews } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: reviewPrompt(reviews),
        },
      ],

      model: process.env.GROQ_MODEL,
    });

    res.status(200).json({
      success: true,
      analysis: completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const recommendFood = async (req, res) => {
  try {
    const { preference, budget } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: recommendationPrompt(preference, budget),
        },
      ],

      model: process.env.GROQ_MODEL,
    });

    res.status(200).json({
      success: true,
      recommendations: completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const searchFoodAI = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL,

      messages: [
        {
          role: "user",
          content: searchPrompt(query),
        },
      ],

      response_format: {
        type: "json_object",
      },

      temperature: 0,
    });

    const filters = JSON.parse(
      completion.choices[0].message.content
    );

const mongoQuery = {};

    if (
      filters.category &&
      filters.category !== ""
    ) {
      mongoQuery.category =
        filters.category;
    }

    if (filters.maxPrice > 0) {
      mongoQuery.price = {
        $lte: filters.maxPrice,
      };
    }

    if (filters.rating > 0) {
      mongoQuery.rating = {
        $gte: filters.rating,
      };
    }

    const foods =
      await Food.find(mongoQuery)
        .populate("restaurant");

   res.status(200).json({
      success: true,
      filters,
      total: foods.length,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};