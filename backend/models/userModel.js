import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter your name"] },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email"],
  },
  password: {
    type: String,
    select: false,
    minLength: [6, "Your password must be longer than 6 characters"],
    required: [true, "Please enter your password"],
  },
  avatar: { public_id: String, url: String },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
