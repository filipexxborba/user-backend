import express from "express";
import mongoose from "mongoose";
const router = express.Router();

// Models
import { UserModel } from "../models/User";

// Login Route
router.post("/", (req: Request, res: Response) => {
  const { username, password } = req.body;
  UserModel.findOne(
    { username: username.toLowerCase() },
    (error: Error, user: any) => {
      if (error) res.status(500).send(error);
      if (!user)
        res
          .status(200)
          .send(
            JSON.stringify({ status: false, message: "Usuário não encontrado" })
          );
      if (user && user.password !== password)
        res.status(200).send(
          JSON.stringify({
            status: false,
            message: "Senha incorreta, verifique novamente.",
          })
        );
      if (user && user.password === password) {
        user.last_login = new Date();
        user
          .save()
          .then((user) => res.status(200).send(user))
          .catch((error) => res.status(500).send(error));
      }
    }
  );
});

// Create User Route
router.post("/create", (req: Request, res: Response) => {
  const { username, password, role } = req.body;
  if (username && password && role) {
    const user = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      username: username.toLowerCase(),
      password: password,
      role: role,
    });

    user
      .save()
      .then((user) => res.status(200).send(user))
      .catch((error) => res.status(500).send(error));
  } else
    res.status(500).send(
      JSON.stringify({
        status: false,
        message:
          "Estão fatando alguns dados para concluir o cadastro, favor verifique.",
      })
    );
});

export default router;
