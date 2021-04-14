import express from "express";
import mongoose from "mongoose";
import request from "supertest";
import { Routes } from "../../server/routes";
import User from "../models/userModel";

const app = express();
app.use(express.json());
app.use(new Routes().getEndpoins());
app.use("/api/fakelink/:username", (req, res) => {
  User.findOne({ username: req.params.username }, (err, data) => {
    if (data) {
      res.send({ link: "shortlink" });
    } else {
      res.status(404).send({ err: "User not found" });
    }
  });
});

mongoose.Promise = global.Promise;

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      if (error.message === "ns not found") return;
      if (error.message.includes("a background operation is currently running"))
        return;
      console.log(error.message);
    }
  }
}

beforeAll(async () => {
  const url = `mongodb://localhost:27017/test`;
  await mongoose.connect(url, { useNewUrlParser: true });
  removeAllCollections();
});

const user1 = "jhon";
const user2 = "marie";
const user3 = "carl";

describe("POST: /api/adduser", () => {
  it("Should add new user", async (done) => {
    const res = await request(app)
      .post("/api/adduser")
      .send({ user: user1 })
      .expect(200);
    expect(res.body.data.username).toBe(user1);
    done();
  });
  it("Shouldn't be able to add the same user", async (done) => {
    const res = await request(app)
      .post("/api/adduser")
      .send({ user: user1 })
      .expect(404);
    expect(res.body.code).toBe(11000);
    done();
  });
  it("Should add new user if it doesn't exist", async (done) => {
    const res = await request(app)
      .post("/api/adduser")
      .send({ user: user2 })
      .expect(200);
    expect(res.body.data.username).toBe(user2);
    done();
  });
  it("User field is required", async (done) => {
    const res = await request(app)
      .post("/api/adduser")
      .send({ name: user1 })
      .expect(404);
    expect(res.body.message).toBe(
      "User validation failed: username: Path `username` is required."
    );
    done();
  });
});

describe("GET: /api/getusers", () => {
  it("Should return users", async (done) => {
    const res = await request(app).get("/api/getusers").expect(200);
    expect(res.body).toHaveLength(2);
    done();
  });
});

describe("GET: /api/getuser/:username", () => {
  it("Should return a user", async (done) => {
    const res = await request(app)
      .get("/api/getuser/" + user2)
      .expect(200);
    expect(res.body.username).toBe(user2);
    done();
  });
  it("Doens't return a user that doesn't exist", async (done) => {
    const res = await request(app)
      .get("/api/getuser/" + user3)
      .expect(404);
    expect(res.body.username).toBeFalsy();
    done();
  });
});

describe("GET: /api/deeplink/:username", () => {
  it("Should generates a dynamic deep link if user exists", async (done) => {
    const res = await request(app)
      .get("/api/fakelink/" + user2)
      .expect(200);
    expect(res.body.link).toBeTruthy();
    done();
  });
  it("Should return error if user doesn't exist", async (done) => {
    const res = await request(app)
      .get("/api/fakelink/" + user3)
      .expect(404);
    expect(res.body.err).toBeTruthy();
    done();
  });
});

afterAll(async () => {
  await dropAllCollections();
  await mongoose.connection.close();
});
