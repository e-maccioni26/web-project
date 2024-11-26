import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Project from './Project';

class UsersProjects extends Model {
  public userId!: number;
  public projectId!: number;
  public date_affectation!: Date;
}

UsersProjects.init(
  {
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
