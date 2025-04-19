import { Router } from "express";
import { getAllMovies, addMovie, deleteMovie, updateMovie } from "../controllers/movies.js";
const router = Router();

//Rutas para administradores
router.get ("/movies", getAllMovies)
router.post ("/movies", addMovie)
router.delete("/movies/:id", deleteMovie);
router.put('/movies/:id', updateMovie);

export default router;