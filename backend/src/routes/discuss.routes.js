import express from "express";
import { getChatRoomsList } from "../controllers/discussController.js";

const discussRoutes = express.Router();

discussRoutes.get("/getChatRooms", getChatRoomsList);

export default discussRoutes;
