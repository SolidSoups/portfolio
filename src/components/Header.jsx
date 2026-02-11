import "./Header.css";
import engineIcon from "../assets/engine.svg";

export default function Header() {
  return (
    <div className="header">
      <h1>ELIAS BROWN</h1>
      <img src={engineIcon} alt="Engine icon" className="header-icon" />
      <h2>ENGINE & TOOLS PROGRAMMER</h2>
    </div>
  );
}
