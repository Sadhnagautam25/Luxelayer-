import addressModel from "../models/address.model.js";

export const addAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const {
      fullName,
      email,
      phone,
      gender,
      companyName,
      country,
      address,
      streetAddress,
      city,
      state,
      zipCode,
      isDefault,
    } = req.body;

    const existingAddress = await addressModel.findOne({
      user: userId,
    });

    if (isDefault) {
      await addressModel.updateMany({ user: userId }, { isDefault: false });
    }

    const newAddress = await addressModel.create({
      user: userId,
      fullName,
      email,
      phone,
      gender,
      companyName,
      country,
      address,
      streetAddress,
      city,
      state,
      zipCode,
      isDefault: isDefault ? true : existingAddress ? false : true,
    });

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyAddresses = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const addresses = await addressModel
      .find({ user: userId })
      .sort({ isDefault: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: addresses.length,
      addresses,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const address = await addressModel.findOne({
      _id: addressId,
      user: userId, // 🔐 security check
    });

    if (!address) {
      const error = new Error("Address not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const address = await addressModel.findOne({
      _id: addressId,
      user: userId,
    });

    if (!address) {
      const error = new Error("Address not found");
      error.statusCode = 404;
      return next(error);
    }

    const {
      fullName,
      email,
      phone,
      gender,
      companyName,
      country,
      address: addr,
      streetAddress,
      city,
      state,
      zipCode,
    } = req.body;

    // 🔹 Update only provided fields
    if (fullName) address.fullName = fullName;
    if (email) address.email = email;
    if (phone) address.phone = phone;
    if (gender) address.gender = gender;
    if (companyName) address.companyName = companyName;
    if (country) address.country = country;
    if (addr) address.address = addr;
    if (streetAddress) address.streetAddress = streetAddress;
    if (city) address.city = city;
    if (state) address.state = state;
    if (zipCode) address.zipCode = zipCode;

    await address.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const address = await addressModel.findOneAndDelete({
      _id: addressId,
      user: userId, // 🔐 security check
    });

    if (!address) {
      const error = new Error("Address not found");
      error.statusCode = 404;
      return next(error);
    }

    if (address.isDefault) {
      const anotherAddress = await addressModel
        .findOne({ user: userId })
        .sort({ createdAt: -1 });

      if (anotherAddress) {
        anotherAddress.isDefault = true;
        await anotherAddress.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const setDefaultAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    // 🔹 Step 1: Check address exists (and belongs to user)
    const address = await addressModel.findOne({
      _id: addressId,
      user: userId,
    });

    if (!address) {
      const error = new Error("Address not found");
      error.statusCode = 404;
      return next(error);
    }

    // 🔹 Step 2: Sab addresses ka default false karo
    await addressModel.updateMany({ user: userId }, { isDefault: false });

    // 🔹 Step 3: Selected address ko default banao
    address.isDefault = true;
    await address.save();

    res.status(200).json({
      success: true,
      message: "Default address set successfully",
      address,
    });
  } catch (error) {
    next(error);
  }
};
