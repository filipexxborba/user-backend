import mongoose, { model, Schema } from "mongoose";
import { IUserDocument } from "../@types/User.type";

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

export const UserModel = model<IUserDocument>("user", userSchema);
