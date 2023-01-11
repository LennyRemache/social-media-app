import express from "express";
import { login } from "./controllers/auth.js";

// allows express to identify that these routes will all be configured and allows us to have these in seperate files
// Like an mini application that lives in the main express app
const router = express.Router();

router.post("/login", login);

export default router; // named authRoutes in index.js
