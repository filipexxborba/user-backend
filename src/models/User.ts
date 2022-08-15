import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    username: { type: String },
    password: { type: String },
    role: { type: String },
    last_login: { type: Date },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export const UserModel = User;
