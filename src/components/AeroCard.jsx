import "./AeroCard.css";

export default function AeroCard({ cardInfo }) {
  return (
    <>
      <button className="aero-card">
        <div className="aero-card-top">
          <img src={cardInfo.imgSrc} />
          <div className="aero-card-desc">
            <h1>{cardInfo.header}</h1>
            <p className="aero-card-description">{cardInfo.desc}</p>
            <div className="aero-card-desc-info aero-div-light">
              <p>{`${cardInfo.teamSize} team members`}</p>
              <p>{`${cardInfo.scopeTime} weeks`}</p>
              <p>{`${cardInfo.engine}`}</p>
            </div>
          </div>
        </div>
      </button>
    </>
  );
}
