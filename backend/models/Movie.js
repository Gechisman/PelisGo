import { DataTypes } from 'sequelize'
import db from '../config/db.js'

//El nombre entre comillas es el que uso para usar p.e. Movie.findAll()
const Movie = db.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'release_year'
    },
    director: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    poster: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },    
}, {
    tableName: 'movies'
});

export default Movie;