const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is a required field"],
      unique: [true, "An account is already associated with this email"],
    },
    userName: {
      type: String,
      required: [true, "Username is a required field"],
      unique: [true, "An account is already associated with this username"],
      trim: true,
    },
    emailVerified: { type: Boolean, default: false },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String, default: "" },
    friends: { type: Array },
  },
  { timestamps: true }
);

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};

module.exports = mongoose.model("User", UserSchema);
