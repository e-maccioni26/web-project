import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Tag from './Tag';
import Tache from './Tache';

class TachesTags extends Model {
  public id!: number;
  public tag_id!: number;
  public tache_id!: number;
}

TachesTags.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
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
  },
  {
    sequelize,
    modelName: 'TachesTags',
  }
);

Tag.belongsToMany(Tache, { through: TachesTags });
Tache.belongsToMany(Tag, { through: TachesTags });

TachesTags.sync();

export default TachesTags;
