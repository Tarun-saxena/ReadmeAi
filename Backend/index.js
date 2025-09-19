import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import repoRoutes from "./routes/repo.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "Public Repository README Generator API" });
});
app.use("/api/repo", repoRoutes);


const frontendDistPath = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(frontendDistPath));

app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
