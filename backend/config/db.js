import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config() //.env file

const db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    
    host: process.env.HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    define:{
      timestamps: false //Para que no cree los campos de creacion y actualizacion
  },
  pool: {
      max: 5, //Numero maximo de conexiones
      min: 0,
      acquire: 30000, //Tiempo de espera para obtener una conexion
      idle: 10000 //Tiempo de espera para liberar una conexion
  },
  operatorAliases: false //Para que no muestre los alias de los operadores
  });

// Database connection (sequelize)
try {
  db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Database connection error:', err))
  await db.sync(); // Synchronize models with the database
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default db;