import { Document, Model } from "mongoose";

interface IHash {
   hashcode: string;
   date: Date;
}

export interface IHashDocument extends IHash, Document {}
export interface IUserModel extends Model<IHashDocument> {}
