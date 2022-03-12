import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import router from "./router.js";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51KXAUxDelfvIQhggaHx7kWBTL4V1NcpOGGFn5B1hYtr532C79ROi6MCyRXFcIoQY2zv0gcuK2yN18MH1a1OhivdC00OcKIrKRI"
);

export {stripe}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (!(process.env.NODE_ENV === "production")) {
  app.use(cors());
}

app.use("/", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database...");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
  })
  .catch((err) => {
    console.error(err);
  });
