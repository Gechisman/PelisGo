import Sequelize from 'sequelize'
import db from '../config/db.js'

const Actor = db.define('Actor', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birth_year: {
      type: Sequelize.INTEGER
    },
    nationality: {
      type: Sequelize.STRING
    }
  }, {
    tableName: 'actors',
    timestamps: false
  });
  
  export default Actor;