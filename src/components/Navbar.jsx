import "./Navbar.css";
export default function Navbar({ currentPage, setPage }) {
  const cls = (page) => `nav-item${currentPage === page ? " selected" : ""}`;

  return (
    <div className="navbar">
      <button className={cls("home")} onClick={() => setPage("home")}>
        HOME
      </button>
      <button className={cls("portfolio")} onClick={() => setPage("portfolio")}>
        PORTFOLIO
      </button>
      <button className={cls("contact")} onClick={() => setPage("contact")}>
        CONTACT
      </button>
    </div>
  );
}
