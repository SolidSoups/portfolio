import "./Navbar.css";
export default function Navbar({ currentPage, setPage }) {
  const cls = (page) => `nav-item${currentPage === page ? " selected" : ""}`;

  return (
    <div className="navbar aero-div-light">
      <button className={cls("home")} onClick={() => setPage("home")}>
        Home
      </button>
      <button className={cls("portfolio")} onClick={() => setPage("portfolio")}>
        Portfolio
      </button>
      <button className={cls("contact")} onClick={() => setPage("contact")}>
        Contact
      </button>
    </div>
  );
}
