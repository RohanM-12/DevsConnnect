import { Router } from "express";
import userRoutes from "./user.routes.js";
import postRoutes from "./posts.routes.js";
import contriRoute from "./contriReq.routes.js";
import connectionRoutes from "./connection.routes.js";

const appRoute = Router();

appRoute.use("/api/v1/user", userRoutes);
appRoute.use("/api/v1/user/Connection", connectionRoutes);
appRoute.use("/api/v1/posts", postRoutes);
appRoute.use("/api/v1/posts/ContributionRequests", contriRoute);

export default appRoute;
