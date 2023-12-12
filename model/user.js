const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');
const {userJoiSchema} = require("./validation/user");
const saltRounds = 10;

const userSchema = new Schema(
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
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  try {
    if(this.isModified('password')){
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
      next();
    }
  } catch (error) {
    next(error);
  }
});

const USER = model("user", userSchema);

// Function to save user with Joi validation
async function saveUser(userData) {
  try {
    // Validate the user data using Joi
    const validatedData = await userJoiSchema.validateAsync(userData);
    
    // If validation is successful, save to MongoDB
    const newUser = new USER(validatedData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    // Handle validation errors
    throw new Error(`Validation error: ${error.message}`);
  }
}

module.exports = {
  USER,
  saveUser,
};