import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Project from './Project';

class UsersProjects extends Model {
  public user_id!: number;
  public project_id!: number;
  public date_affectation!: Date;
}

UsersProjects.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: 'id',
      },
    },
    date_affectation: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'UsersProjects',
  }
);

User.belongsToMany(Project, { through: UsersProjects });
Project.belongsToMany(User, { through: UsersProjects });

UsersProjects.sync();

export default UsersProjects;
