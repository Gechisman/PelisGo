import { Movie, Genre, Actor, Review } from '../models/index.js';

const getAllMovies = async (req, res) => {
    try {
        // 🎯 Filtros
        const { year, genre } = req.query;

        const where = {};
        const include = [
        { model: Genre, through: { attributes: [] } },
        { model: Actor, through: { attributes: [] } },
        { model: Review }
        ];

        // 🎯 Filtro por año (releaseYear)
        if (year) {
        where.releaseYear = year;
        }

        // 🎯 Filtro por género
        if (genre) {
        include[0].where = { name: genre };
        }

        const movies = await Movie.findAll({
        where,
        include
        });

        //Para importar la url de la imagen
        const moviesWithPosterUrl = movies.map(movie => {
            const data = movie.toJSON(); // Convertimos el objeto Sequelize a un JSON plano
            return {
              ...data,
              posterUrl: data.poster 
                ? `${process.env.BASE_URL}/public/images/${data.poster}`
                : null
            };
          });      
          res.json(moviesWithPosterUrl);
    } catch (error) {
        console.error('Failed to load films:', error);
        res.status(500).json({ error: 'Failed to load films' });
    }
};

const getOneMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id, {
            include: [
                { model: Genre, through: { attributes: [] } },  // muchos a muchos
                { model: Actor, through: { attributes: [] } },  // muchos a muchos
                { model: Review }                               // uno a muchos
              ],
              where: { id : id }
        });
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
          }
          res.json(movie);
    } catch (error) {
        console.error('Failed to load films:', error);
        res.status(500).json({ error: 'Failed to load films' });
    }
};

const addMovie = async (req, res) => {
    try {
        const { title, releaseYear, director, duration, poster, description, genres, actors } = req.body;
        
        // 1. Crear la película
        const newMovie = await Movie.create({
            title,
            releaseYear,
            director,
            duration,
            poster,
            description
        });

        // 2. Asociar géneros si vienen
        if (genres && genres.length > 0) {
            await newMovie.setGenres(genres);
        }
    
        // 3. Asociar actores si vienen
        if (actors && actors.length > 0) {
            await newMovie.setActors(actors);
        }

        res.status(201).json(newMovie);
    } catch (error) {
        console.error('Failed to add movie:', error);
        res.status(500).json({ error: 'Failed to add movie' });
    }
}

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        
        // 1. Buscar la película
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

         // 2. Borrar las reviews asociadas
        await Review.destroy({ where: { movie_id: id } });

        // 3. Remover relaciones
        await movie.setGenres([]);
        await movie.setActors([]);

        // 4. Eliminar la película
        await movie.destroy();

        res.status(204).send();
    } catch (error) {
        console.error('Failed to delete movie:', error);
        res.status(500).json({ error: 'Failed to delete movie' });
    }
}

const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, releaseYear, director, duration, poster, description, genreIds, actorIds, } = req.body;
        
        // 1. Buscar la película
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Solo actualiza los campos que vengan definidos en el body
        const updatedFields = {};
        if (title !== undefined) updatedFields.title = title;
        if (releaseYear !== undefined) updatedFields.releaseYear = releaseYear;
        if (director !== undefined) updatedFields.director = director;
        if (duration !== undefined) updatedFields.duration = duration;
        if (poster !== undefined) updatedFields.poster = poster;
        if (description !== undefined) updatedFields.description = description;

        // 2. Actualizar la película
        await movie.update(updatedFields);

         // 3. Actualizar relaciones (si se proporcionan)
        if (genreIds) {
            await movie.setGenres(genreIds); // Reemplaza los géneros actuales
        }
    
        if (actorIds) {
            await movie.setActors(actorIds); // Reemplaza los actores actuales
        }
  
        res.json({ message: 'Película actualizada correctamente', movie });
    } catch (error) {
        console.error('Failed to update movie:', error);
        res.status(500).json({ error: 'Failed to update movie' });
    }
}

export { getAllMovies, getOneMovie, addMovie, deleteMovie, updateMovie };