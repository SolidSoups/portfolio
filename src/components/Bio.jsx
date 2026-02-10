import "./Bio.css";

export default function Bio() {
  return (
    <div className="bio-container aero-div-light">
      <div className="bio-grid aero-div-dark">
        <img src="portrait.png" />
        <div className="about-me-section">
          <h1>Elias Brown</h1>
          <p>
            <b>
              <i>
                Game Engine & Tools Developer focusing on in-house game-engine
                developement (c++)
              </i>
            </b>
          </p>
          <p>
            Currently studying at FutureGames Malmö as a second year. In my
            studies I've built game engines from the ground up, created tools
            for designers and artists, and solo defeated game projects.
          </p>
          <p>
            At the end of my education I will be looking for an internship, from
            the 18th of May to the 25th of December, 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
