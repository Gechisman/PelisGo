import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import generateJWT from '../helpers/generateJWT.js';
import generateId from '../helpers/generateId.js';
import bcrypt from 'bcrypt';

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
    defaultValue: generateId()
  },
  confirmado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: 'users',
  timestamps: false,
  
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(user.password, salt)
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
      }
    }
  }
});

User.prototype.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

export default User;