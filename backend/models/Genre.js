import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Genre = db.define('Genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'genres',
    timestamps: false
  });
  
  export default Genre;