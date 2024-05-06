import { Router } from "express";
import {
  createContributionRequest,
  getContributionRequests,
  updateContributionRequestStatus,
} from "../controllers/contriReqController.js";

const contriRoute = Router();
contriRoute.post("/createRequest", createContributionRequest);
contriRoute.put("/updateStatus", updateContributionRequestStatus);
contriRoute.get("/getRequests", getContributionRequests);
export default contriRoute;
