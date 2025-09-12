import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

import repoRoutes from "./routes/repo.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ 
    message: "Public Repository README Generator API",
    version: "1.0.0",
    status: "ok" 
  });
});

app.use("/api/repo", repoRoutes);

// Serve static files from React build
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendDistPath));

// Handle React Router - send all non-API requests to index.html
app.use((req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return next();
  }
  // Serve React app for all other routes
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

async function startServer() {
  try {

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
