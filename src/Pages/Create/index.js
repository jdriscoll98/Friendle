import { useState } from "react";
import SimpleCrypto from "simple-crypto-js";

export function Create() {
  const [secret] = useState("is-a-secret"); // not a really a secret but whatever

  const [newWordValue, setNewWordValue] = useState("");

  function createNewGame() {
    // encrypt the word
    const encryptedWord = encryptWord(newWordValue);
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
            createNewGame();
          }
        }}
        disabled={!newWordValue}
        className={`create-btn ${!newWordIsValid() && "disabled"}`}
      >
        Create
      </button>
    </div>
  );
}
