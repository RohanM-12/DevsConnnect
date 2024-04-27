import express from "express";
import "dotenv/config";
import chalk from "chalk";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.send("hello /");
});

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app files

import appRoute from "./routes/index.js";
app.use(appRoute);

app.listen(PORT, () =>
  console.log(chalk.bgBlue(`server running on port ${PORT}`))
);
