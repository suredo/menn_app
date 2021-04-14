import mongoose from "mongoose";
let db: string;

if (process.env.NODE_ENV === "development") {
  db = "mongodb://localhost:27017/dev";
} else {
  db =
    "mongodb+srv://suredo:XgIMRblUPBTHmphy@cluster0.nolvm.mongodb.net/Mern_Prod?retryWrites=true&w=majority";
}

export const connect = async () => {
  return await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
