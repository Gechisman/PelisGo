import { Router } from "express";
import { getAllMovies, getOneMovie, addMovie, deleteMovie, updateMovie } from "../controllers/movies.js";
const router = Router();

router.get("/movies", getAllMovies);
router.post ("/movies", addMovie)
router.delete("/movies/:id", deleteMovie);
router.put("/movies/:id", updateMovie);

router.get("/movie/:id", getOneMovie);

export default router;