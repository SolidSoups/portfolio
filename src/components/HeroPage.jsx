import "./HeroPage.css";
import Skills from "./Skills";
import Bio from "./Bio";
import PortfolioPage from "./PortfolioPage";

export default function HeroPage() {
  return (
    <>
      <div className="hero-page">
        <Bio />
        <Skills />
      </div>
    </>
  );
}
