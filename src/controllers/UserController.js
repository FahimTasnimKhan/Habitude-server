import mongoose from 'mongoose';
import User from '../models/User.js';
import { HttpResponse } from '../utils/HttpResponse.js';
import cloudinary from '../config/cloudinary.js';

export const GetUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    return HttpResponse(res, 200, false, 'Users fetched successfully', users);
  } catch (error) {
    console.error(error);
    return HttpResponse(res, 500, true, 'Internal Server Error');
  }
};

export const GetUserByID = async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponse(res, 400, true, 'User ID is required');
  if (!mongoose.Types.ObjectId.isValid(id))
    return HttpResponse(res, 400, true, 'Invalid user ID format');

  try {
    const user = await User.findById(id).select('-__v');
    if (!user) return HttpResponse(res, 404, true, 'User not found');
    return HttpResponse(res, 200, false, 'User fetched successfully', user);
  } catch (error) {
    console.error(error);
    return HttpResponse(res, 500, true, 'Internal Server Error');
  }
};

export const GetUserbyuid = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await User.findOne({ uid: uid });
    if (!user) return HttpResponse(res, 404, true, 'User not found');
    return HttpResponse(
      res,
      200,
      false,
      'User Info Fetched Successfully',
      user
    );
  } catch (error) {
    console.error(error);
    return HttpResponse(res, 500, true, 'Internal Server Error');
  }
};

export const CreateUser = async (req, res) => {
  const { name, email, photo, uid } = req.body;
  if (!name || !email || !uid)
    return HttpResponse(res, 400, true, 'Name, Email, and UID are required');

  let photoURL = '';

  if (photo) {
    const uploadResponse = await cloudinary.uploader.upload(photo);
    photoURL = uploadResponse.secure_url;
  }

  try {
    const newUser = await User.create({
      name,
      email,
      photoURL,
      uid,
    });
    return HttpResponse(res, 201, false, 'User created successfully', newUser);
  } catch (error) {
    console.error(error);
    if (error.code === 11000)
      return HttpResponse(res, 400, true, 'User already exists');
    return HttpResponse(res, 500, true, 'Internal Server Error');
  }
};

export const UpdateUser = async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponse(res, 400, true, 'User ID is required');
  if (!mongoose.Types.ObjectId.isValid(id))
    return HttpResponse(res, 400, true, 'Invalid user ID format');

  try {
    const { name, email, photoURL, bannerImg } = req.body;
    if (!name && !email && !photoURL && !bannerImg)
      return HttpResponse(res, 400, true, 'At least one field is required');

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, photoURL, bannerImg },
      { new: true }
    );
    if (!updatedUser) return HttpResponse(res, 404, true, 'User not found');

    return HttpResponse(
      res,
      200,
      false,
      'User updated successfully',
      updatedUser
    );
  } catch (error) {
    console.error(error);
    return HttpResponse(res, 500, true, 'Internal Server Error');
  }
};

export const DeleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponse(res, 400, true, 'User ID is required');
  if (!mongoose.Types.ObjectId.isValid(id))
    return HttpResponse(res, 400, true, 'Invalid user ID format');

  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return HttpResponse(res, 404, true, 'User not found');
    return HttpResponse(res, 200, false, 'User deleted successfully');
  } catch (error) {
    console.error(error);
    return HttpResponse(res, 500, true, 'Internal Server Error');
  }
};
