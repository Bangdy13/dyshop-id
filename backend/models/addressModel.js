import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  postCode: { type: String, required: true },
  country: { type: String, required: true },

  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Address ||
  mongoose.model("Address", addressSchema);
