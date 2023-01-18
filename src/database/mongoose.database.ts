import mongoose from "mongoose";
require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTIONSTRING!);
const database = mongoose.connection;

export const connectMongooseDatabase = () =>
   database.once("open", () =>
      console.log("Conexão com o banco de dados efetuada com sucesso!")
   );
