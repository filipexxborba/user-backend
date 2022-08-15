require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRole from "./routes/Auth";

mongoose.connect(process.env.DB_CONNECTIONSTRING!);
const database = mongoose.connection;

database.once("open", () =>
  console.log("Conexão com o banco de dados efetuada com sucesso!")
);

const server = express();

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Routes
server.get("/", (_, res) => {
  res.status(200).send("Teste");
});

server.use("/auth", authRole);

server.listen(process.env.PORT || 3000, () =>
  console.log(`🐱‍🏍 Servidor rodando na porta: ${process.env.PORT || 3000}`)
);
