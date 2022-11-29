import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { root } from "./data.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// CORS setting
const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Get the content with the received path
const getDirContent = (pathArray) => {
  const ERROR = { error: "No such content" };
  const len = pathArray.length;
  let dest = root;

  if (len === 1) {
    if (pathArray[0] !== "root") {
      return ERROR;
    }
  } else {
    for (let i = 1; i < len; i++) {
      const item = pathArray[i];
      if (!dest.children) return ERROR;
      dest = dest.children[item];
      if (!dest) return ERROR;
    }
  }

  if (dest.type === "file") {
    return { type: "file", name: pathArray.pop() };
  }

  if (dest.type === "dir") {
    // Get the direct children of the directory
    const children = Object.entries(dest.children).map(([name, { type }]) => ({
      name,
      type,
    }));
    return { type: "dir", children };
  }
};

// Get path
// Receive the path from an array in params
app.get("/path/:pathArray", (req, res) => {
  const pathArr = JSON.parse(req.params.pathArray);

  const content = getDirContent(pathArr);

  if ("error" in content) {
    res.status(404).json(content);
  } else {
    res.status(200).json(content);
  }
});
