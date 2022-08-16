import { model, Schema } from "mongoose";

const hashSchema = new Schema(
  {
    hashcode: { type: String },
    date: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Hash = model("Hash", hashSchema);
export const HashModel = Hash;
