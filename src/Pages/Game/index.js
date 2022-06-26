import { useState, useEffect } from "react";
import { GameBoard, GameKeyboard } from "../../Components";
import SimpleCrypto from "simple-crypto-js";
import wordbank from "../../WordBank/wordbank";
export function Game() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");

  // TODO: Refactor this into a computed prop since we can calculate it from other states
  const [gameOver, setGameOver] = useState(false);

  function getAnswer() {
    const simpleCrypto = new SimpleCrypto("is-a-secret");

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

  function getDefinition(word) {
    if (!word) {
      return;
    }
    return wordbank[word.toLowerCase()];
  }

  useEffect(() => {
    const checkForWinner = (guesses) => {
      if (
        (guesses &&
          JSON.parse(guesses)[JSON.parse(guesses).length - 1] ===
            getAnswer()) ||
        (guesses && JSON.parse(guesses).length === 6)
      ) {
        setGameOver(true);
      }
    };

    const fetchGuesses = () => {
      const guesses = localStorage.getItem(gameId);
      if (guesses) {
        setGuesses(JSON.parse(guesses));
      }
      return guesses;
    };
    // get game id from url
    const gameId = window.location.pathname.split("/")[2];
    if (gameId) {
      // get guesses from local storage
      const guesses = fetchGuesses();
      // if the last guess was correct, set game over to true
      checkForWinner(guesses);
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
        // if guess is not in wordbank or isnt the answer, alert
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
        return;
      }

      // if this is the last guess, alert
      if (currentGuess.length === 5 && guesses.length === 5) {
        alert("You lost! The answer was " + getAnswer());
        setGameOver(true);
        return;
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

  return (
    <>
      <GameBoard
        guesses={guesses}
        currentGuess={currentGuess}
        gameOver={gameOver}
        getAnswer={getAnswer}
        getDefinition={getDefinition}
      />
      <GameKeyboard
        guesses={guesses}
        onKeyPress={onKeyPress}
        gameOver={gameOver}
        getAnswer={getAnswer}
      />
    </>
  );
}
