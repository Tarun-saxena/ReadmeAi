import React from "react";
import { Link } from "react-router-dom";
import "./MainPagestyle.css";

export default function MainPage() {
  return (
    <div className="main">
      <header className="hero">
        <h1>
          The easiest way to create a <br />
          <span className="highlight">README</span>
        </h1>
        <p>
          Our simple editor allows you to quickly add and customize all the
          sections you need for your project's readme
        </p>
        <Link to="/generator" className="btn">
          Generate README
        </Link>
      </header>

      <section className="preview">
        <img src="/img.png" alt="README Editor Interface" />
      </section>

      <footer className="footer">
        Made by Tarun
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub"
        />
      </footer>
    </div>
  );
}
