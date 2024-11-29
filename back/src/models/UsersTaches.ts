import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Tache from './Tache';

class UsersTaches extends Model {
  public userId!: number;
  public tacheId!: number;
  public date_affectation!: Date;
}

UsersTaches.init(
  {
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


UsersTaches.belongsTo(Tache, { foreignKey: 'TacheId' });
UsersTaches.belongsTo(User, { foreignKey: 'UserId' });



export default UsersTaches;
