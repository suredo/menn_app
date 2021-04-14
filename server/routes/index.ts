import { Router } from "express";

import { Api } from "./api";

export class Routes {
  private routes: Router;

  constructor() {
    this.routes = Router();
    this.endpoints();
  }

  private endpoints() {
    this.routes.use("/auth", (req, res) => {
      res.send("will do it later");
    });
    this.routes.use("/api", new Api().getRoutes());
  }

  public getEndpoins() {
    return this.routes;
  }
}
