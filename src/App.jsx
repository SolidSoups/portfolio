import "./App.css";
import "./fonts.css";
import "./content.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import PortfolioPage from "./components/PortfolioPage";
import ContactPage from "./components/ContactPage";
import HomePage from "./components/HomePage";

import { useState } from "react";

function App() {
  const [page, setPage] = useState("home");

  const pages = {
    home: <HomePage />,
    portfolio: <PortfolioPage />,
    contact: <ContactPage />,
  };

  return (
    <>
      <div className="main-view-flex">
        <div className="main-view">
          {/* HEADER */}
          <div className="header-panel">
            <div className="header-panel-top aero-div-blue">
              <Header />
            </div>
            <div className="header-panel-bottom aero-div-light">
              <Navbar setPage={setPage} currentPage={page} />
            </div>
          </div>

          {/* CONTENT */}
          <div className="content-flex aero-div-light">{pages[page]}</div>
        </div>
      </div>
    </>
  );
}

export default App;
