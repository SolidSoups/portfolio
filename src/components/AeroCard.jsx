import "./AeroCard.css";

export default function AeroCard({ cardInfo }) {
  return (
    <>
      <button className="aero-card">
        <div className="aero-card-top">
          <img src={cardInfo.imgSrc} />
          <div className="aero-card-desc">
            <h1>{cardInfo.header}</h1>
            <p>{cardInfo.desc}</p>
          </div>
        </div>
        <div className="aero-card-bottom">
          <p>{`${cardInfo.teamSize} team members`}</p>
          <p>{`${cardInfo.scopeTime} weeks`}</p>
          <p>{cardInfo.engine}</p>
        </div>
      </button>
    </>
  );
}
