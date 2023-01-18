import { model, Schema } from "mongoose";
import { IHashDocument } from "../@types/hash.type";

const hashSchema = new Schema(
   {
      hashcode: { type: String },
      date: { type: Date },
   },
   {
      timestamps: true,
   }
);

export const HashModel = model<IHashDocument>("hash", hashSchema);
