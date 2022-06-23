import { Link } from "react-router-dom";

export function Appbar() {
  return (
    <div className="app-bar">
      <h1>Friendle</h1>
      <div className="app-bar-buttons">
        <Link to="/">
          <button className="app-bar-btn">New Game</button>
        </Link>
        <div>
          <button
            className={`app-bar-btn ${
              !window.location.pathname.split("/")[2] ? "hidden" : ""
            }`}
            onClick={async () => {
              // share game through text
              const gameId = window.location.pathname.split("/")[2];
              if (!gameId) {
                return;
              }
              const gameUrl = `${window.location.origin}/game/${gameId}`;
              const text = `Play my friendle at ${gameUrl}`;

              // copy to clipboard
              await navigator.clipboard.writeText(text);
              alert("URL copied to clipboard!");
            }}
          >
            Share Game
          </button>
        </div>
      </div>
    </div>
  );
}
