import { Router } from "express";
import { authenticate, registerUser, confirmUser } from "../controllers/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", authenticate);

router.get("/confirm/:token", confirmUser)

export default router;