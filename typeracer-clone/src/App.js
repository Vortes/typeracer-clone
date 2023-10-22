import { useState } from "react";
import TypingWorkspace from "./TypingWorkspace";
import CountdownTimer from "./CountdownTimer";
import DisplayWPM from "./DisplayWPM";
import styles from "./styles.css"

function App() {
  const [timer, setTimer] = useState(15);
  const [inputText, setInputText] = useState("");
  const [timerOn, setTimerOn] = useState(false);
  const [errorIndexes, setErrorIndexes] = useState([]);
  let currentIndex = inputText.split("").length - 1;

  return (
    <div className="flex flex-col">
      <TypingWorkspace
        inputText={inputText}
        setInputText={setInputText}
        timerOn={timerOn}
        setTimerOn={setTimerOn}
        errorIndexes={errorIndexes}
        setErrorIndexes={setErrorIndexes}
        currentIndex={currentIndex}
      />

      <CountdownTimer timer={timer} setTimer={setTimer} timerOn={timerOn} />
      <DisplayWPM timer={timer} timerOn={timerOn} inputText={inputText} />
    </div>
  );
}

export default App;
