import express from "express";
import sequelize from "./config/database";
import router from "./routes/routes";
import cors from "cors";


const app = express();
app.use(cors({
  origin: "*", // Autoriser seulement cette origine
  methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes autorisées
  allowedHeaders: ["Content-Type", "Authorization"], // Headers autorisés
}));
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();


    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database");
  }
  await sequelize.sync(); console.log(`Server is running on http://localhost:${PORT}`);
});