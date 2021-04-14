import express from "express";
import next from "next";
import cors from "cors";
import { NextServer } from "next/dist/server/next";
import * as db from "./db";
import { Routes } from "./routes";
import { server } from "../config/server";

const dev = process.env.NODE_ENV !== "production";

export class Server {
  private server: express.Application;
  private app: NextServer;

  constructor(private port: any) {
    this.server = express();
    this.app = next({ dev });
  }

  private setupExpress() {
    const handle = this.app.getRequestHandler();
    this.server.use(express.json());
    this.server.use(new Routes().getEndpoins());
    this.server.all("*", (req, res) => handle(req, res));
  }

  private async databaseSetup() {
    await db.connect();
  }

  public async init() {
    await this.app.prepare();
    this.setupExpress();
    await this.databaseSetup();
  }

  public listen() {
    this.server.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
}
