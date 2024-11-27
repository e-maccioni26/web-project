import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Project from './Project';

interface UserProjectUser {
  id: number;
  nom: string;
  email: string;
  mot_de_passe: string;
  date_creation: Date;
}

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

UsersProjects.belongsTo(Project, { foreignKey: 'ProjectId' });
UsersProjects.belongsTo(User, { foreignKey: 'UserId' });



export default UsersProjects;
