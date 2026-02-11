import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useState, useEffect } from "react";

export default function ProjectPage({ mdFile, rawContent }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (rawContent) {
      setContent(rawContent);
    } else if (mdFile) {
      fetch("/" + mdFile)
        .then((res) => res.text())
        .then((text) => setContent(text));
    }
  }, [mdFile]);

  return (
    <div className="site-content">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
    </div>
  );
}
