import Bio from "./Bio";
import "./HomePage.css";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useState, useEffect } from "react";

export default function HomePage() {
  const markdown = "# Hello\n## Helloo\nThis is **markdown** text";
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/home.md")
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  return (
    <div className="bio-section">
      <div className="markdown-content">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
