
import express from "express";
import fetch from "node-fetch";
import { generateReadme } from "../utils/gemini.js";

const router = express.Router();


router.post("/public", async (req, res) => {
  try {
    const { owner, repo } = req.body || {};
    if (!owner || !repo) {
      return res.status(400).json({ error: "owner and repo are required" });
    }

    const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json"
      }
    });
    if (!ghRes.ok) {
      const text = await ghRes.text();
      return res.status(ghRes.status).json({ error: "GitHub API error", details: text });
    }
    const repoData = await ghRes.json();

    const readme = await generateReadme(repoData);
    res.json({ readme });
  } catch (err) {
    console.error("/repo/public error", err);
    res.status(500).json({ error: err.message || "Failed to generate README" });
  }
});


export default router;
