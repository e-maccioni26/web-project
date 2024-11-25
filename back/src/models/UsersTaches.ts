import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Tache from './Tache';

class UsersTaches extends Model {
  public user_id!: number;
  public tache_id!: number;
  public date_affectation!: Date;
}

UsersTaches.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    tache_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tache,
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
    modelName: 'UsersTaches',
  }
);

User.belongsToMany(Tache, { through: UsersTaches });
Tache.belongsToMany(User, { through: UsersTaches });

UsersTaches.sync();

export default UsersTaches;
