import React from "react";

const TypingWorkspace = ({
  timerOn,
  setTimerOn,
  inputText,
  setInputText,
  errorIndexes,
  setErrorIndexes,
  currentIndex,
}) => {
  const paragraph =
    "When you are certain you have become quite a proficient touch typist, you can put yourself to the ultimate fun test. Sit at your computer and have someone place a blindfold over your eyes. Next have your assistant dictate to you";
  let paragraphArray = paragraph.split("");

  const readInput = (e) => {
    setInputText(e.target.value);
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

  return (
    <>
      <input type="text" onChange={readInput} value={inputText} />
      <p>{paragraph}</p>
      <p>{inputText}</p>
      <p>error at {errorIndexes}</p>
    </>
  );
};

export default TypingWorkspace;
