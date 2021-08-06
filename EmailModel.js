import mongoose from 'mongoose';

const emailModel = mongoose.Schema({
  email: {
    unique: true,
    required: true,
    type: String
  }
});

export const Email = mongoose.model('Email', emailModel);
