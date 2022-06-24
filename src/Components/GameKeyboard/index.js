import Keyboard from "react-simple-keyboard";
import { useRef } from "react";
export function GameKeyboard(props) {
  const keyboard = useRef();

  function disableKeys() {
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
    allKeys.forEach((key) => {
      let shouldShowKey = true;
      // return false if key is in guesses but not in answer
      props.guesses.forEach((guess) => {
        if (guess.includes(key) && !props.getAnswer().includes(key)) {
          shouldShowKey = false;
        }
      });
      if (!shouldShowKey) {
        const btn = document.querySelector(`[data-skbtn="${key}"]`);
        btn.classList.add("key-disabled");
      }
    });
  }
  disableKeys();

  return (
    <div className={`game-keyboard ${props.gameOver ? "hidden" : ""}`}>
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        onKeyPress={props.onKeyPress}
        layout={{
          default: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            "Z X C V B N M",
            "{enter} {bksp}",
          ],
          shift: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            "Z X C V B N M",
            "{enter} {bksp}",
          ],
        }}
      />
    </div>
  );
}
