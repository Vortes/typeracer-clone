import React, { useEffect, useState } from "react";

const DisplayWPM = ({ timer, timerOn, inputText }) => {
  const [wpm, setWpm] = useState(0);
  
  useEffect(() => {
    if (timer === 0 && timerOn) {
      calculateWpm();
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
      <p>wpm: {wpm}</p>
    </>
  );
};

export default DisplayWPM;
