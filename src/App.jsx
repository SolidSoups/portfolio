import "./App.css";
import "./fonts.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import HeroPage from "./components/HeroPage";
import PortfolioPage from "./components/PortfolioPage";
import ContactPage from "./components/ContactPage";

import { useState } from "react";

function App() {
  const [page, setPage] = useState("home");

  const pages = {
    home: <HeroPage />,
    portfolio: <PortfolioPage />,
    contact: <ContactPage />,
  };

  return (
    <>
      <div className="main-view-flex">
        <div className="main-view">
          <Header />
          <Navbar setPage={setPage} currentPage={page} />
          <div className="content-flex">{pages[page]}</div>
        </div>
      </div>
    </>
  );
}

export default App;
