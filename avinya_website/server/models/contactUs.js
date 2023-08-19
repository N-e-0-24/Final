import mongoose from 'mongoose';

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const contactUs = mongoose.model('contactUs', contactUsSchema);

export default contactUs;
