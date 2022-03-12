import mongoose from "mongoose";

const userTable = mongoose.Schema({
  email: String,
  password: String,
});

export default mongoose.model("User", userTable);
