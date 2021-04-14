import { Request, Response } from "express";
import user from "../models/userModel";

export class UserController {
  public addUser(req: Request, res: Response) {
    user.findOne({ username: req.body.user }, (err, data) => {
      if (data) {
        res.status(404).send({ code: 11000 });
      } else {
        user
          .create({ username: req.body.user })
          .then((data) => res.status(200).send({ data }))
          .catch((error) => res.status(404).send(error));
      }
    });
  }
  public getUsers(req: Request, res: Response) {
    user
      .find({})
      .then((data) => {
        return res.status(200).send(data);
      })
      .catch((err) => res.status(500).send(err));
  }
  public getUser(req: Request, res: Response) {
    user
      .findOne({ username: req.params.username })
      .then((data) => {
        if (data) {
          return res.status(200).send(data);
        } else {
          res.status(404).send({ err: "User doesn't exist" });
        }
      })
      .catch((err) => res.status(500).send(err));
  }
}
