import Food from "../models/Food.js";


// Add Food
export const addFood = async (
  req,
  res
) => {
  try {
    const food = await Food.create(
      req.body
    );

    res.status(201).json({
      success: true,
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Get All Foods
export const getFoods = async (
  req,
  res
) => {
  try {
    const foods =
      await Food.find();

    res.status(200).json({
      success: true,
      count: foods.length,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Get Single Food
export const getFoodById =
  async (req, res) => {
    try {
      const food =
        await Food.findById(
          req.params.id
        );

      if (!food) {
        return res.status(404).json({
          success: false,
          message:
            "Food not found",
        });
      }

      res.status(200).json({
        success: true,
        food,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };



// Update Food
export const updateFood =
  async (req, res) => {
    try {
      const food =
        await Food.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        food,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };



// Delete Food
export const deleteFood =
  async (req, res) => {
    try {
      await Food.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Food deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const getRestaurantFoods =
async(req,res)=>{
  try {

    const foods =
    await Food.find({
      restaurant:req.params.id
    });

    res.status(200).json({
      success:true,
      foods
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};