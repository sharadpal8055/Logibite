import Restaurant from "../models/Restaurant.js";

export const createRestaurant =
async (req,res)=>{
  try {

    const restaurant =
    await Restaurant.create(req.body);

    res.status(201).json({
      success:true,
      restaurant
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};



export const getRestaurants =
async(req,res)=>{
  try {

    const restaurants =
    await Restaurant.find();

    res.status(200).json({
      success:true,
      count:restaurants.length,
      restaurants
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};



export const getRestaurantById =
async(req,res)=>{
  try {

    const restaurant =
    await Restaurant.findById(
      req.params.id
    );

    if(!restaurant){
      return res.status(404).json({
        success:false,
        message:"Restaurant not found"
      });
    }

    res.status(200).json({
      success:true,
      restaurant
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};



export const updateRestaurant =
async(req,res)=>{
  try {

    const restaurant =
    await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );

    res.status(200).json({
      success:true,
      restaurant
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};



export const deleteRestaurant =
async(req,res)=>{
  try {

    await Restaurant.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success:true,
      message:"Restaurant deleted"
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};