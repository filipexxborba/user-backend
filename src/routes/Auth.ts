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
          "Estão faltando alguns dados para concluir o cadastro, favor verifique.",
      })
    );
});

// Return all users Route
router.get("/users", (_, res: Response) => {
  UserModel.find({}, (error: Error, users) => {
    if (error) res.status(500).send(error);
    if (!error) res.status(200).send(users);
  });
});

// Delete an user by id Route
router.delete("/users", (req: Request, res: Response) => {
  const { id } = req.body;
  UserModel.findByIdAndDelete(id, (error: Error, user) => {
    if (error) res.status(500).send(error);
    if (!error) res.status(200).send(user);
  });
});

// Change the password of user id Route
router.patch("/users", (req: Request, res: Response) => {
  const { id, newPassword } = req.body;
  console.log(id, newPassword);
  UserModel.findByIdAndUpdate(
    id,
    { password: newPassword },
    (error: Error, user) => {
      if (error) res.status(500).send(error);
      if (!error) res.status(200).send(user);
    }
  );
});

export default router;
