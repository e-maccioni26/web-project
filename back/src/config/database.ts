import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import User from '../models/User';
import Tache from '../models/Tache';
import Tag from '../models/Tag';
import UsersTaches from '../models/UsersTaches';
import TachesTags from '../models/TachesTags';
import Project from '../models/Project';
import UsersProjects from '../models/UsersProjects';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as 'postgres',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  }
);


export default sequelize;
