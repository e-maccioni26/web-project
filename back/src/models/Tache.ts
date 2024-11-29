import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Project from './Project';

interface TacheAttributes {
  id: number;
  titre: string;
  description: string;
  date_creation: Date;
  date_echeance: Date;
  priorite: 'basse' | 'moyenne' | 'haute';
  statut: 'à faire' | 'en cours' | 'terminée';
  project_id: number;
}

interface TacheCreationAttributes extends Optional<TacheAttributes, 'id'> {}

class Tache extends Model<TacheAttributes, TacheCreationAttributes> implements TacheAttributes {
  public id!: number;
  public titre!: string;
  public description!: string;
  public date_creation!: Date;
  public date_echeance!: Date;
  public priorite!: 'basse' | 'moyenne' | 'haute';
  public statut!: 'à faire' | 'en cours' | 'terminée';
  public project_id!: number;
}

Tache.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    date_creation: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    date_echeance: {
      type: DataTypes.DATEONLY,
    },
    priorite: {
      type: DataTypes.ENUM('basse', 'moyenne', 'haute'),
      defaultValue: 'moyenne',
    },
    statut: {
      type: DataTypes.ENUM('à faire', 'en cours', 'terminée'),
      defaultValue: 'à faire',
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Tache',
  }
);

Tache.belongsTo(Project, { foreignKey: 'project_id', onDelete: 'CASCADE' });


export default Tache;
