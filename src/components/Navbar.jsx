import "./Navbar.css";
export default function Navbar({ currentPage, setPage }) {
  const portfolioPages = ["portfolio", "sushi2go", "daggerbound", "slaylien", "whatislove"];
  const cls = (page) =>
    `nav-item${currentPage === page || (page === "portfolio" && portfolioPages.includes(currentPage)) ? " selected" : ""}`;

  return (
    <div className="navbar">
      <button className={cls("home")} onClick={() => setPage("home")}>
        HOME
      </button>
      <div className="nav-dropdown-wrapper">
        <button className={cls("portfolio")} onClick={() => setPage("portfolio")}>
          PORTFOLIO
        </button>
        <div className="nav-dropdown">
          <button className="nav-dropdown-item" onClick={() => setPage("sushi2go")}>Sushi 2 Go</button>
          <button className="nav-dropdown-item" onClick={() => setPage("daggerbound")}>Daggerbound</button>
          <button className="nav-dropdown-item" onClick={() => setPage("slaylien")}>Slaylien</button>
          <button className="nav-dropdown-item" onClick={() => setPage("whatislove")}>What Is Love?</button>
        </div>
      </div>
      <button className={cls("contact")} onClick={() => setPage("contact")}>
        CONTACT
      </button>
    </div>
  );
}
