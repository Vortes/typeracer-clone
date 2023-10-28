import React, { useEffect, useState } from "react";

const DisplayWPM = ({ timer, timerOn, setTimerOn, inputText, socket}) => {
  const [wpm, setWpm] = useState(0);
  const [oppWpm, setOppWpm] = useState(0)

  useEffect(() => {
    if (!timerOn) {
      console.log("times up")

      socket.emit("send-wpm", wpm)
      socket.on("receive-message", message => {
        setOppWpm(message)
      })
    }
  }, [timerOn]);
  
  useEffect(() => {
    if (timer === 0 && timerOn) {
      calculateWpm();
      setTimerOn(prev => !prev)
    }
  }, [timer]);

  const calculateWpm = () => {
    if (timer === 0) {
      const time = 0.25;
      const char = inputText.split("").length;
      const typedEntries = char / 5;
      setWpm(typedEntries / time);
    }
  };
  return (
    <>
      <p className="text-xl text-textInput mt-2">wpm: {wpm}</p>
      <p className="text-xl text-textInput mt-4">opp wpm: {oppWpm}</p>
    </>
  );
};

export default DisplayWPM;
