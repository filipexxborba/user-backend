require("dotenv").config();
import express, { Application } from "express";
import cors from "cors";
import authRoute from "./routes/auth.route";
import hashRoute from "./routes/hash.route";
import { connectMongooseDatabase } from "./database/mongoose.database";

const server: Application = express();

// Middlewares configuration
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Routes
server.use("/auth", authRoute);
server.use("/hash", hashRoute);

// Database connection
connectMongooseDatabase();

// Server initialization
server.listen(process.env.PORT || 3000, () =>
   console.log(`🐱‍🏍 Servidor rodando na porta: ${process.env.PORT || 3000}`)
);
