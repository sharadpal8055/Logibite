import Address from "../models/Address.js";

/* ==========================================
   Add Address
========================================== */

export const addAddress = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      houseNumber,
      street,
      landmark,
      city,
      state,
      pincode,
      addressType,
    } = req.body;

    // Required fields validation
    if (
      !fullName ||
      !phone ||
      !houseNumber ||
      !street ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Duplicate address check
    const existingAddress = await Address.findOne({
      user: req.userId,
      houseNumber,
      street,
      city,
      pincode,
    });

    if (existingAddress) {
      return res.status(400).json({
        success: false,
        message: "Address already exists",
      });
    }

    // First address becomes default
    const addressCount = await Address.countDocuments({
      user: req.userId,
    });

    const address = await Address.create({
      user: req.userId,
      fullName,
      phone,
      houseNumber,
      street,
      landmark,
      city,
      state,
      pincode,
      addressType,
      isDefault: addressCount === 0,
    });

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Get User Addresses
========================================== */

export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      user: req.userId,
    }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: addresses.length,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Get Single Address
========================================== */

export const getAddressById = async (
  req,
  res
) => {
  try {

    const address =
      await Address.findById(
        req.params.id
      );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Ownership Check
    if (
      address.user.toString() !==
      req.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      address,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ==========================================
   Update Address
========================================== */

export const updateAddress = async (
  req,
  res
) => {
  try {

    const address =
      await Address.findById(
        req.params.id
      );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Ownership Check
    if (
      address.user.toString() !==
      req.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const {
      fullName,
      phone,
      houseNumber,
      street,
      landmark,
      city,
      state,
      pincode,
      addressType,
    } = req.body;

    address.fullName =
      fullName ?? address.fullName;

    address.phone =
      phone ?? address.phone;

    address.houseNumber =
      houseNumber ??
      address.houseNumber;

    address.street =
      street ?? address.street;

    address.landmark =
      landmark ?? address.landmark;

    address.city =
      city ?? address.city;

    address.state =
      state ?? address.state;

    address.pincode =
      pincode ?? address.pincode;

    address.addressType =
      addressType ??
      address.addressType;

    await address.save();

    res.status(200).json({
      success: true,
      message:
        "Address updated successfully",
      address,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
/* ==========================================
   Delete Address
========================================== */

export const deleteAddress = async (
  req,
  res
) => {
  try {

    const address =
      await Address.findById(
        req.params.id
      );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Ownership Check
    if (
      address.user.toString() !==
      req.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const wasDefault =
      address.isDefault;

    await address.deleteOne();

    // If deleted address was default,
    // make another address default automatically

    if (wasDefault) {

      const anotherAddress =
        await Address.findOne({
          user: req.userId,
        });

      if (anotherAddress) {

        anotherAddress.isDefault = true;

        await anotherAddress.save();

      }

    }

    res.status(200).json({
      success: true,
      message:
        "Address deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* ==========================================
   Set Default Address
========================================== */

export const setDefaultAddress =
  async (req, res) => {

    try {

      const address =
        await Address.findById(
          req.params.id
        );

      if (!address) {
        return res.status(404).json({
          success: false,
          message:
            "Address not found",
        });
      }

      // Ownership Check
      if (
        address.user.toString() !==
        req.userId
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Unauthorized",
        });
      }

      // Remove old default
      await Address.updateMany(
        {
          user: req.userId,
        },
        {
          isDefault: false,
        }
      );

      // Make selected address default
      address.isDefault = true;

      await address.save();

      res.status(200).json({
        success: true,
        message:
          "Default address updated",
        address,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };