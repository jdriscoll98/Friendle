import { useState, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import SimpleCrypto from "simple-crypto-js";

export function Game() {
  const keyboard = useRef();

  function onKeyPress(button) {
    if (gameOver) {
      return;
    }
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
      // if they're right, alert
      if (currentGuess === getAnswer()) {
        alert("You got it!");
        setGameOver(true);
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
    // if route is not /game/:id, return
    if (!window.location.pathname.includes("/game/")) {
      return;
    }
    const board = [];
    const currentGuessRow = guesses.length;
    // for each row
    for (let i = 0; i < 6; i++) {
      // for each column
      for (let j = 0; j < 5; j++) {
        if (i === currentGuessRow) {
          board.push(
            <div className="box" key={`${i}-${j}-box`}>{`${
              currentGuess[j] || " "
            }`}</div>
          );
        } else {
          board.push(
            <div
              className={`box ${getPreviousGuessStyle(guesses[i], j)}`}
              key={`${i}-${j}-box`}
            >{`${guesses[i] ? guesses[i][j] ?? "" : ""}`}</div>
          );
        }
      }
    }
    return board;
  }

  function getPreviousGuessStyle(guess, letterIndex) {
    if (!guess) {
      return;
    }

    const word = getAnswer();

    if (word[letterIndex] === guess[letterIndex]) {
      return "green";
    } else if (word.includes(guess[letterIndex])) {
      return "yellow";
    } else {
      return "";
    }
  }

  function getAnswer() {
    const simpleCrypto = new SimpleCrypto(secret);
    // get game id from url
    const gameId = window.location.pathname.split("/")[2];
    if (!gameId) {
      return;
    }
    // replace '_' with '/'
    const encryptedWord = gameId.replace(/_/g, "/");
    // decrypt the word
    return simpleCrypto.decrypt(encryptedWord);
  }

  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const [secret] = useState("is-a-secret"); // not a really a secret but whatever

  return (
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
  );
}
