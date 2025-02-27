import { Router } from "express";
import authControllers from "../controllers/authControllers.js";
// import authenticate from "../middlewares/authenticate.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post("/create", authControllers.createUser);
authRouter.post("/signup", authControllers.signup);
authRouter.post("/signin", authControllers.signin);
authRouter.post("/logout", authenticate, authControllers.logout);
authRouter.get("/getCurrent", authenticate, authControllers.getCurrent);

export default authRouter;
