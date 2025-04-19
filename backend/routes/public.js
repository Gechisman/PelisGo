import { Router } from "express";
import { getAllMovies, getOneMovie } from "../controllers/movies.js";
const router = Router();

//Usuarios normales
router.get("/movies", getAllMovies);
router.get("/movie/:id", getOneMovie);

export default router;