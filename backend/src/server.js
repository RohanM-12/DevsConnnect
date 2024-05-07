import express from "express";
import "dotenv/config";
import chalk from "chalk";
import cors from "cors";
import serveStatic from "serve-static";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.send("hello /");
});

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("uploads"));
app.use("/uploads", serveStatic(path.join(__dirname, "routes", "uploads")));

// app.use(extraRoutes);

// app.get("/api/institutes/:name/institute", async (req, res) => {
//   const { name } = req.params;
//   try {
//     const response = await fetch(
//       `https://api.geeksforgeeks.org/api/institutes/${name}/institute`
//     );
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app files

import appRoute from "./routes/index.js";
app.use(appRoute);

app.listen(PORT, () =>
  console.log(chalk.bgBlue(`server running on port ${PORT}`))
);
