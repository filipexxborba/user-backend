require("dotenv").config();
import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth.route";
import hashRoute from "./routes/hash.route";
import { connectMongooseDatabase } from "./database/mongoose.database";

const server: Application = express();

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Routes
server.get("/", (_, res) => {
   res.status(200).send("Teste");
});

server.use("/auth", authRoute);
server.use("/hash", hashRoute);

connectMongooseDatabase();
server.listen(process.env.PORT || 3000, () =>
   console.log(`🐱‍🏍 Servidor rodando na porta: ${process.env.PORT || 3000}`)
);
