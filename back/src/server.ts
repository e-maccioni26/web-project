import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import sequelize from "./config/database";
import router from "./routes/routes";

import User from "./models/User";
import Tache from "./models/Tache";
import Tag from "./models/Tag";
import UsersTaches from "./models/UsersTaches";
import TachesTags from "./models/TachesTags";
import Project from "./models/Project";
import UsersProjects from "./models/UsersProjects";


const app = express();
app.use(express.json());

app.use(router);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await User.sync();
    await Project.sync();
    await Tache.sync();
    await Tag.sync();
    await UsersTaches.sync();
    await TachesTags.sync();
    await UsersProjects.sync();


    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database");
  }
  await sequelize.sync();  console.log(`Server is running on http://localhost:${PORT}`);
});
