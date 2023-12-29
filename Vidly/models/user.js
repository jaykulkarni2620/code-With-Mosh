const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 250,
  },

  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 1025,
  }
});

const User = mongoose.model('User', userSchema);

function validateUser(User) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(3).max(250).email().required(),
    password: Joi.string().min(5).max(255).required()
  });

  return Joi.validate(User, schema);
}

    
exports.User = User; 
exports.validate = validateUser;