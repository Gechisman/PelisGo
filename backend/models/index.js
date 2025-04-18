import db from '../config/db.js';

import Movie from './Movie.js';
import Genre from './Genre.js';
import Actor from './Actor.js';
import Review from './Review.js';

// Many-to-Many: Movies <-> Genres
Movie.belongsToMany(Genre, { through: 'movie_genres', foreignKey: 'movie_id' });
Genre.belongsToMany(Movie, { through: 'movie_genres', foreignKey: 'genre_id' });

// Many-to-Many: Movies <-> Actors
Movie.belongsToMany(Actor, { through: 'movie_actors', foreignKey: 'movie_id' });
Actor.belongsToMany(Movie, { through: 'movie_actors', foreignKey: 'actor_id' });

// One-to-Many: Movies -> Reviews
Movie.hasMany(Review, { foreignKey: 'movie_id' });
Review.belongsTo(Movie, { foreignKey: 'movie_id' });

export {
    db,
    Movie,
    Genre,
    Actor,
    Review
  };
