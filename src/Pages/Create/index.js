import { useState } from "react";
import SimpleCrypto from "simple-crypto-js";
import wordBank from "../../WordBank/wordbank";
export function Create() {
  const [secret] = useState("is-a-secret"); // not a really a secret but whatever

  const [newWordValue, setNewWordValue] = useState("");

  function createNewGame(word) {
    // encrypt the word
    const encryptedWord = encryptWord(word);
    // replace '/' with '_'
    const encryptedWordWithDashes = encryptedWord.replace(/\//g, "_");
    // navigate to the game page
    window.location.href = `/game/${encryptedWordWithDashes}`;
  }

  function encryptWord(word) {
    const simpleCrypto = new SimpleCrypto(secret);
    return simpleCrypto.encrypt(word);
  }

  function newWordIsValid() {
    return newWordValue?.length === 5;
  }
  return (
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
            createNewGame(newWordValue);
          }
        }}
        disabled={!newWordValue}
        className={`create-btn ${!newWordIsValid() && "disabled"}`}
      >
        Create
      </button>
      <h1 style={{ color: "white" }}>OR</h1>
      <button
        className="create-btn"
        onClick={(e) => {
          e.preventDefault();
          // pick a random word from the wordbank
          const randomWord =
            wordBank[Math.floor(Math.random() * wordBank.length)];
          // encrypt the word
          createNewGame(randomWord);
        }}
      >
        Play a random word
      </button>
    </div>
  );
}
