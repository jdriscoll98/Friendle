import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import "./App.css";

function App() {
  const [newWordValue, setNewWordValue] = useState("");
  const keyboard = useRef();
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");

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
    // get the most recent guess
    // if key is backspace
    if (button === "{bksp}") {
      // remove the last character from the current guess
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (button === "{enter}") {
      // if currentguess is 5 characters long add it to the guesses array
      if (currentGuess.length === 5) {
        setGuesses([...guesses, currentGuess]);
        setCurrentGuess("");
      }
    } else {
      // add the new character to the current guess
      // if current guess is less than 5 characters long add it to the current guess
      if (currentGuess.length < 5) {
        setCurrentGuess(currentGuess + button);
      }
    }
  }

  function getGameBoard() {
    const board = [];
    const currentGuessRow = guesses.length;
    // for each row
    for (let i = 0; i < 6; i++) {
      // for each column
      for (let j = 0; j < 5; j++) {
        // if the current row and column is in the guesses array
        // return the letter
        if (i === currentGuessRow) {
          board.push(
            <div className="box" key={`${i}-${j}-box`}>{`${
              currentGuess[j] || " "
            }`}</div>
          );
        } else {
          board.push(
            <div className="box" key={`${i}-${j}-box`}>{`${
              guesses[i] ? guesses[i][j] ?? "" : ""
            }`}</div>
          );
        }
      }
    }
    return board;
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
                  <div className="game-container">{getGameBoard()}</div>
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
