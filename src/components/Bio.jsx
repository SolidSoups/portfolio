import "./Bio.css";

export default function Bio() {
  return (
    <div className="bio-container">
      <div className="bio-grid aero-div-dark">
        <img src="portrait.png" />
        <div className="bio-grid-info">
          <h1>Elias Brown</h1>
          <p>
            <i>
              Game Engine & Tools Programmer focusing on in-house game-engine
              developement (c++)
            </i>
          </p>
        </div>
      </div>
    </div>
  );
}
