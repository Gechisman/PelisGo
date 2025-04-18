import Sequelize from 'sequelize'
import db from '../config/db.js'

//El nombre entre comillas es el que uso para usar p.e. Movie.findAll()
const Movie = db.define('Movie', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    releaseYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'release_year'
    },
    director: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    poster: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },    
}, {
    tableName: 'movies'
});

export default Movie;