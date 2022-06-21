import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Appbar } from "./Components/";
import { Create, Game } from "./Pages/";

import "react-simple-keyboard/build/css/index.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* App bar */}
        <Appbar />
        {/* Body */}
        <div className="app-body">
          <Routes>
            <Route path="/" element={<Create />}></Route>
            <Route path="game/:gameId" element={<Game />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
