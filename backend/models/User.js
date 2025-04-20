import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const User = db.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // 'required' no es una opción válida en Sequelize
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  token: {
    type: DataTypes.STRING,
  },
  confirmado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: 'users',
  timestamps: false,
});

export default User;