import { Schema, Document, model } from "mongoose";

interface IUser extends Document {
  username: string;
}

const User = new Schema({
  username: { type: String, required: true, unique: true, dropDups: true },
});

export default model<IUser>("User", User);
