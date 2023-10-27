import { useEffect, useState } from "react";
import TypingWorkspace from "./TypingWorkspace";
import CountdownTimer from "./CountdownTimer";
import DisplayWPM from "./DisplayWPM";
import styles from "./styles.css"
import { socket } from './socket';


function App() {
  const [timer, setTimer] = useState(2)
  const [inputText, setInputText] = useState("")
  const [timerOn, setTimerOn] = useState(false)
  const [errorIndexes, setErrorIndexes] = useState([])

  return (
    <div className="flex flex-col mx-44">
      <div className="mt-44">
      <CountdownTimer timer={timer} setTimer={setTimer} timerOn={timerOn} />
      <TypingWorkspace
        timer={timer}
        inputText={inputText}
        setInputText={setInputText}
        timerOn={timerOn}
        setTimerOn={setTimerOn}
        errorIndexes={errorIndexes}
        setErrorIndexes={setErrorIndexes}
        socket={socket}
      />
      </div>

      <DisplayWPM timer={timer} timerOn={timerOn} setTimerOn={setTimerOn} inputText={inputText} socket={socket}/>

    </div>
  );
}

export default App;
