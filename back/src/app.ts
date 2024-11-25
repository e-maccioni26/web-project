import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import { errorHandler } from "./utils/errorHandler";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use(errorHandler);

export default app;