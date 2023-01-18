import { Document, Model } from "mongoose";

export interface IUser {
   username: string;
   password: string;
   role: string;
   last_login: Date;
}

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}
