import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cipherName: { type: String, required: true },
    email: { type: String, required: true },
    original_image: { type: String },
    gen_image: { type: String },
    method: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
