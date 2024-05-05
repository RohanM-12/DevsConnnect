import { Router } from "express";
import {
  createContributionRequest,
  updateContributionRequestStatus,
} from "../controllers/contriReqController.js";

const contriRoute = Router();
contriRoute.post("/createRequest", createContributionRequest);
contriRoute.put("/updateStatus", updateContributionRequestStatus);
export default contriRoute;
