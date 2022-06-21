import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import "./App.css";

function App() {
  const [newWordValue, setNewWordValue] = useState("");
  const keyboard = useRef();

  function newWordIsValid() {
    return newWordValue?.length === 5;
  }

  function createNewGame() {
    // create a unique id for the new game
    const newGameId = Math.random().toString(36).substring(2, 15);
    // set local storage to store the new game id and the word to simulate DB storage
    localStorage.setItem(newGameId, newWordValue);
    // redirect to the new game
    window.location.href = `/game/${newGameId}`;
  }

  function onKeyPress(button) {
    console.log("Button pressed", button);
  }

  return (
    <div className="App">
      {/* App bar */}
      <div className="app-bar">
        <h1>Friendle</h1>
      </div>
      {/* Body */}
      <div className="app-body">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div className="create-container">
                  <h2 className="create-heading">Create a new friendle game</h2>
                  <input
                    className="create-input"
                    placeholder="Type a 5 letter word"
                    value={newWordValue}
                    onChange={(e) => {
                      setNewWordValue(e.target.value);
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (!newWordValue) {
                        alert("Please enter a word");
                        return;
                      } else {
                        createNewGame();
                      }
                    }}
                    disabled={!newWordValue}
                    className={`create-btn ${!newWordIsValid() && "disabled"}`}
                  >
                    Create
                  </button>
                </div>
              }
            ></Route>
            <Route
              path="game/:gameId"
              element={
                <>
                  <div className="game-container">
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>

                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>

                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>

                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>

                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>

                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                  </div>
                  <div className="game-keyboard">
                    <Keyboard
                      keyboardRef={(r) => (keyboard.current = r)}
                      onKeyPress={onKeyPress}
                      layout={{
                        default: [
                          "q w e r t y u i o p",
                          "a s d f g h j k l",
                          "{enter} z x c v b n m {bksp}",
                        ],
                        shift: [
                          "q w e r t y u i o p",
                          "a s d f g h j k l",
                          "{enter} z x c v b n m {bksp}",
                        ],
                      }}
                    />
                  </div>
                </>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
