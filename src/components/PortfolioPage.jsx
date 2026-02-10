import AeroCard from "./AeroCard";
import "./PortfolioPage.css";

export default function PortfolioPage() {
  return (
    <>
      <div className="cards-panel aero-div-light">
        <h1>Team Projects</h1>
        <AeroCard
          cardInfo={{
            header: "SUSHI 2 GO!",
            desc: "Endless runner in a sushi restaurant.",
            imgSrc: "sushi2go-edit.png",
            teamSize: 10,
            scopeTime: 3,
            engine: "Unity",
          }}
        />
        <AeroCard
          cardInfo={{
            header: "DAGGERBOUND",
            desc: "Rogue-like RPG with turn-based combat.",
            imgSrc: "daggerbound_final.png",
            teamSize: 13,
            scopeTime: 4.5,
            engine: "Unity",
          }}
        />
        <AeroCard
          cardInfo={{
            header: "SLAYLIEN",
            desc: "Tower-defense 3rd-person zombie shooter",
            imgSrc: "slaylien_final.jpg",
            teamSize: 12,
            scopeTime: 7,
            engine: "Unreal",
          }}
        />
        <AeroCard
          cardInfo={{
            header: "WHAT IS LOVE?",
            desc: "CO-OP railshooter with Ikaruga inspired color mechanic.",
            imgSrc: "whatislove_final.png",
            teamSize: 3,
            scopeTime: 4,
            engine: "Unity",
          }}
        />
      </div>
    </>
  );
}
