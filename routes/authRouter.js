import { Router } from "express";
import authControllers from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/create", authControllers.createUser);
authRouter.post("/signup", authControllers.signup);

export default authRouter;
