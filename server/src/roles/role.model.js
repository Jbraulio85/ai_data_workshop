import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../configs/db.js';

export class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: 'ADMIN_ROLE, USER_ROLE, SYSTEM_ROLE, SALES_ROLE',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'role',
    timestamps: false, // Los roles suelen ser estáticos
  },
);
