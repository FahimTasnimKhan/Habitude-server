// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photoURL: {
      type: String,
      default: '',
    },
    bannerImg: {
      type: String,
      default: '',
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const User = mongoose.model('User', UserSchema, 'users');
export default User;
// users is the Collection Name
