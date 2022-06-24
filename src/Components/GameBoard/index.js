import { Create } from "../../Pages";

export function GameBoard(props) {
  function getGuessBlocks() {
    const results = props.guesses.map((guess) => {
      const blocks = getGuessStyles(guess.toUpperCase(), props.getAnswer());
      return blocks
        .map((block) => {
          if (block === "") {
            // return black square emoji
            return "⬛";
          } else if (block === "green") {
            // return green square emoji
            return "🟩";
          } else {
            // return yellow square emoji
            return "🟨";
          }
        })
        .join("");
    });

    return results.join("\n");
  }
  async function shareResults() {
    const gameId = window.location.pathname.split("/")[2];
    if (!gameId) {
      return;
    }
    let text = `Friendle! ${props.guesses.length}/6\n${getGuessBlocks()}
    `;
    // copy to cliipboard
    await navigator.clipboard.writeText(text);
    alert("Results copied to clipboard!");
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
  function getGameBoard() {
    // if route is not /game/:id, return
    if (!window.location.pathname.includes("/game/")) {
      return;
    }
    if (props.gameOver) {
      const answer = props.getAnswer();
      const definition = props.getDefinition(answer);
      return (
        <div className="game-over-board">
          <h1>Game Over</h1>
          <p>The answer was {answer}</p>
          {definition && (
            <p>
              {answer}: {definition.slice(0, 150)}...
            </p>
          )}

          <button
            onClick={() => {
              shareResults();
            }}
          >
            Share your results!
          </button>
          <Create />
        </div>
      );
    }
    const board = [];
    const currentGuessRow = props.guesses.length;
    const answer = props.getAnswer();
    // for each row
    for (let i = 0; i < 6; i++) {
      // for each column
      for (let j = 0; j < 5; j++) {
        const guessStyles = getGuessStyles(props.guesses[i], answer);

        if (i === currentGuessRow) {
          board.push(
            <div className={`box ${guessStyles[j]}`} key={`${i}-${j}-box`}>{`${
              props.currentGuess[j] || " "
            }`}</div>
          );
        } else {
          board.push(
            <div className={`box ${guessStyles[j]}`} key={`${i}-${j}-box`}>{`${
              props.guesses[i] ? props.guesses[i][j] ?? "" : ""
            }`}</div>
          );
        }
      }
    }
    return board;
  }
  return <div className="game-container">{getGameBoard()}</div>;
}
