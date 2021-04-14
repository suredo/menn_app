import { Router } from "express";
import fetch from "node-fetch";
import User from "../../models/userModel";
import { UserController } from "../../controllers/userController";

const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http%3A%2F%2F192.168.100.93%3A3000"
  : "https%3A%2F%2Fmern-app-test2.herokuapp.com";

const userController = new UserController();

export class Api {
  private routes: Router;

  constructor() {
    this.routes = Router();
    this.endpoints();
  }

  private endpoints() {
    this.routes.post("/adduser", userController.addUser);
    this.routes.get("/getusers", userController.getUsers);
    this.routes.get("/getuser/:username", userController.getUser);
    this.routes.get("/deeplink/:username", (req, res) => {
      const username = req.params.username;
      User.findOne({ username: username }, (err, data) => {
        if (data) {
          fetch(
            `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyDX2Jz29zy797C8xL57T_xOM58OXxJy6FM`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                longDynamicLink: `https://merndeeplink.page.link/?link=${server}%3Fuser%3D${username}&apn=com.mern_native&afl=${server}%2Fdownload%2Fandroid%2F${username}&isi=389801252&ifl=${server}%2Fdownload%2Fios%2F${username}&ofl=${server}%2Fdownload%2F${username}`,
              }),
            }
          )
            .then((data) => data.json())
            .then((data) => {
              res.append(
                "Content-Type",
                "application/javascript; charset=UTF-8"
              );
              res.status(200).json({ link: data.shortLink });
            })
            .catch((err) => res.status(500).send(err));
        } else if (err) {
          res.status(500).send(err);
        } else {
          res.status(404).send({ err: "User not found" });
        }
      });
    });
  }

  public getRoutes() {
    return this.routes;
  }
}
