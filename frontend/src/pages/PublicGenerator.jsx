import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./PublicGeneratorstyle.css";
const API_URL = import.meta.env.VITE_API_URL;


export default function PublicGenerator() {
  const [repoUrl, setRepoUrl] = useState("");
  const [readme, setReadme] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateReadme() {
    setError("");
    setReadme("");
    try {
      if (!repoUrl.includes("github.com/")) {
        setError("Please enter a valid GitHub repository URL.");
        return;
      }
      const parts = repoUrl.replace("https://github.com/", "").split("/");
      if (parts.length < 2) {
        setError("URL must be in the form https://github.com/<owner>/<repo>");
        return;
      }
      const owner = parts[0];
      const repo = parts[1].replace(/\.git$/, "");
      setLoading(true);
     const res = await axios.post(`${API_URL}/repos/public`, { owner, repo });


      setReadme(res.data.readme || "");
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || "Request failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function copyReadme() {
    if (!readme) return;
    navigator.clipboard.writeText(readme);
    alert("README copied to clipboard ");
  }

  function downloadReadme() {
    if (!readme) return;
    const blob = new Blob([readme], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("README downloaded ");
  }

  return (
    <>
      <div className="topbar">
        <Link to="/">
          <button className="back-btn"> Back </button>
        </Link>
      </div>

      <div className="public-generator">
        <h1 className="title">GitHub Repository README Generator</h1>
        <p className="subtitle">
          Enter a GitHub repository URL and instantly generate a professional,
          complete README file.
        </p>

        <input
          className="input"
          placeholder="https://github.com/owner/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        <button
          className="generate-btn"
          disabled={loading}
          onClick={generateReadme}
        >
          {loading ? "Generating..." : "Generate README"}
        </button>

        {error && (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        )}

        {readme && (
          <div className="readme-box">
            <div className="readme-header">
              <h2>Generated README</h2>
              <div className="readme-actions">
                <button className="copy-btn" onClick={copyReadme}>
                  Copy
                </button>
                <button className="download-btn" onClick={downloadReadme}>
                  Download
                </button>
              </div>
            </div>
            <pre className="readme-content">{readme}</pre>
          </div>
        )}
      </div>
    </>
  );
}
