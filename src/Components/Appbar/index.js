import { Link } from "react-router-dom";

export function Appbar() {
  return (
    <div className="app-bar">
      <h1>Friendle</h1>
      <div className="app-bar-buttons">
        <Link to="/">
          <button>New Game</button>
        </Link>
      </div>
    </div>
  );
}
