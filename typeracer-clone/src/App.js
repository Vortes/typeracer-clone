import { useEffect, useRef, useState } from "react";

function App() {
  const fetchData = async () => {
    const response = await fetch("/api/");
    const result = await response.json();
    console.log(result);
  };

  const paragraph =
    "When you are certain you have become quite a proficient touch typist, you can put yourself to the ultimate fun test. Sit at your computer and have someone place a blindfold over your eyes. Next have your assistant dictate to you";
  let paragraphArray = paragraph.split("");
  const [timer, setTimer] = useState(15);
  const [inputText, setInputText] = useState("");
  const [textArray, setTextArray] = useState("");
  const [wpm, setWpm] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  let intervalRef = useRef(null);
  const [errorIndexes, setErrorIndexes] = useState([]);
  let currentIndex = inputText.split("").length - 1;

  const readInput = (e) => {
    setInputText(e.target.value);
    setTextArray(e.target.value.split(""));

    if (!timerOn) {
      setTimerOn(true);
    }

    if (e.target.value[currentIndex] !== paragraphArray[currentIndex]) {
      handleError();
    } else if (errorIndexes.includes(currentIndex)) {
      correctError();
    }
  };

  const handleError = () => {
    if (
      !errorIndexes.includes(currentIndex) &&
      currentIndex < paragraphArray.length
    ) {
      setErrorIndexes([...errorIndexes, currentIndex]);
    }
  };

  const correctError = () => {
    setErrorIndexes(errorIndexes.filter((error) => error !== currentIndex));
  };

  const calculateWpm = () => {
    if (timer === 0) {
      console.log("in calculate");
      const time = 0.25;
      const char = textArray.length;
      const typedEntries = char / 5;
      // console.log("chars: " + char)
      // console.log(typedEntries)
      setWpm(typedEntries / time);
    }
  };

  const decreaseTime = () => {
    setTimer((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        return prev; // keep it at 0
      }
    });
  };

  useEffect(() => {
    fetchData();

    if (timerOn) {
      intervalRef.current = setInterval(decreaseTime, 1000);
      return () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      };
    }
  }, [timerOn]);

  useEffect(() => {
    if (timer === 0 && timerOn) {
      calculateWpm();
    }
  }, [timer]);

  return (
    <div>
      <input type="text" onChange={readInput} value={inputText} />
      <p>{paragraph}</p>
      <p>{inputText}</p>
      <p>{timer}</p>

      <p>wpm: {wpm}</p>
      {/* <p>textArray length: {textArray.length}</p> */}

      <p>error at {errorIndexes}</p>
    </div>
  );
}

export default App;
