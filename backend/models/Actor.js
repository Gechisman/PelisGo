import { DataTypes } from 'sequelize';
import db from '../config/db.js'

const Actor = db.define('Actor', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birth_year: {
      type: DataTypes.INTEGER
    },
    nationality: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'actors',
    timestamps: false
  });
  
  export default Actor;