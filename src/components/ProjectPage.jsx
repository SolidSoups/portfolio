import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useState, useEffect } from "react";
import "./ProjectPage.css";

export default function ProjectPage({ mdFile, rawContent }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (mdFile) {
      fetch("/" + mdFile)
        .then((res) => res.text())
        .then((text) => setContent(text));
    }
  }, [mdFile]);

  return (
    <div className="site-content" style={{width: "100%"}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {mdFile ? content : rawContent}
      </ReactMarkdown>
    </div>
  );
}
