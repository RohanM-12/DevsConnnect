import { Router } from "express";
import userRoutes from "./user.routes.js";

const appRoute = Router();

appRoute.use("/api/v1/user", userRoutes);

export default appRoute;
