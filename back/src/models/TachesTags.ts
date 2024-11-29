import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Tag from './Tag';
import Tache from './Tache';
import Project from './Project';
class TachesTags extends Model {
  public tagId!: number;
  public tacheId!: number;
}

TachesTags.init(
  {
  },
  {
    sequelize,
    modelName: 'TachesTags',
  }
);

Tag.belongsToMany(Tache, { through: TachesTags });
Tache.belongsToMany(Tag, { through: TachesTags });


TachesTags.belongsTo(Tache, { foreignKey: 'TacheId' });
TachesTags.belongsTo(Tag, { foreignKey: 'TagId' });


export default TachesTags;
