import express from "express";
import authRoutes from "./modules/auth/auth.routes"; // Importation des routes
import { Request, Response } from "express";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
