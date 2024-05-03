import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes";
import { connect } from "mongoose";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

(async () => {
  try {
    console.log("Connecting to database...");
    await connect('mongodb+srv://admin:admin@cluster0.jnspk8n.mongodb.net/?authMechanism=DEFAULT');
    app.use(express.json());
    app.use(cors());
    app.use("/", router);
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
