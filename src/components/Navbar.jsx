import "./Navbar.css";
export default function Navbar({ currentPage, setPage }) {
  const cls = (page) => `nav-item${currentPage === page ? " selected" : ""}`;

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
          <button className="nav-dropdown-item">Sushi 2 Go</button>
          <button className="nav-dropdown-item">Daggerbound</button>
          <button className="nav-dropdown-item">Slaylien</button>
          <button className="nav-dropdown-item">What Is Love?</button>
        </div>
      </div>
      <button className={cls("contact")} onClick={() => setPage("contact")}>
        CONTACT
      </button>
    </div>
  );
}
