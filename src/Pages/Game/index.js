import { useState, useRef, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import SimpleCrypto from "simple-crypto-js";

export function Game() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const [secret] = useState("is-a-secret");

  const keyboard = useRef();

  useEffect(() => {
    // get game id from url
    const gameId = window.location.pathname.split("/")[2];
    if (gameId) {
      // get guesses from local storage

      const guesses = localStorage.getItem(gameId);
      if (guesses) {
        setGuesses(JSON.parse(guesses));
      }
    }
  }, []);

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
        const gameId = window.location.pathname.split("/")[2];
        // store guesses in localstorage
        localStorage.setItem(
          gameId,
          JSON.stringify([...guesses, currentGuess])
        );
      }
      // if they're right, alert
      if (currentGuess.toUpperCase() === getAnswer().toUpperCase()) {
        alert("You got it!");
        setGameOver(true);
      }

      // if this is the last guess, alert
      if (guesses.length === 6) {
        alert("You lost! The answer was " + getAnswer());
        setGameOver(true);
      }
    } else {
      if (button === "*") {
        return;
      }
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
    const answer = getAnswer();
    // for each row
    for (let i = 0; i < 6; i++) {
      // for each column
      for (let j = 0; j < 5; j++) {
        const guessStyles = getGuessStyles(guesses[i], answer);

        if (i === currentGuessRow) {
          board.push(
            <div className={`box ${guessStyles[j]}`} key={`${i}-${j}-box`}>{`${
              currentGuess[j] || " "
            }`}</div>
          );
        } else {
          board.push(
            <div className={`box ${guessStyles[j]}`} key={`${i}-${j}-box`}>{`${
              guesses[i] ? guesses[i][j] ?? "" : ""
            }`}</div>
          );
        }
      }
    }
    return board;
  }

  function getGuessStyles(guess, word) {
    const guessStyles = ["", "", "", "", ""];
    if (!guess) {
      return guessStyles;
    }
    let wordCopy = word.toUpperCase();
    const guessCopy = guess.toUpperCase();
    for (let i = 0; i < 5; i++) {
      // if letter is in correct position, return green, mark as correct
      if (guessCopy[i] === wordCopy[i]) {
        // replace letter with *
        wordCopy = wordCopy.replace(wordCopy[i], "*");
        guessStyles[i] = "green";
      }
    }

    for (let i = 0; i < 5; i++) {
      // if letter is in word, but not in correct position, and not already in the guess return yellow
      if (wordCopy.includes(guessCopy[i]) && !guessStyles[i]) {
        const index = wordCopy.indexOf(guessCopy[i]);
        wordCopy = wordCopy.replace(wordCopy[index], "*");
        guessStyles[i] = "yellow";
      }
    }
    return guessStyles;
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
    return simpleCrypto.decrypt(encryptedWord).toUpperCase();
  }

  function getKeys() {
    const allKeys = [
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
    ];
    const filteredKeys = allKeys.map((key) => {
      let shouldShowKey = true;
      // return false if key is in guesses but not in answer
      guesses.forEach((guess) => {
        if (guess.includes(key) && !getAnswer().includes(key)) {
          shouldShowKey = false;
        }
      });
      return shouldShowKey ? key : "*";
    });
    const rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(filteredKeys.slice(i * 10, i * 10 + 10).join(" "));
    }
    rows.push("{enter} {bksp}");
    return rows;
  }

  return (
    <>
      <div className="game-container">{getGameBoard()}</div>
      <div className="game-keyboard">
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          onKeyPress={onKeyPress}
          layout={{
            default: getKeys(),
            shift: getKeys(),
          }}
        />
      </div>
    </>
  );
}
