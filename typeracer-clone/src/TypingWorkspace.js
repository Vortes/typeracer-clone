import React, { useEffect, useState } from "react";
import getRandomParagraph from "./utils/getRandomParagraph";

const TypingWorkspace = ({
    timer,
    timerOn,
    setTimerOn,
    inputText,
    setInputText,
    errorIndexes,
    setErrorIndexes,
    currentIndex,
}) => {
    const [paragraph, setParagraph] = useState("")

    useEffect(()=> {
        const generatedParagraph = getRandomParagraph(35).join(" ")
        setParagraph(generatedParagraph)
    }, [])

    let paragraphArray = paragraph.split("");

    const readInput = (e) => {
        setInputText(e.target.value);
        if (timer === 0) {
            e.target.disabled = true
        }

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
        <div className="flex flex-col">
            <input className="border py-2" type="text" onChange={readInput} value={inputText} />
            <p className="text-3xl text-textParagraph">{paragraph}</p>
            <p className="text-2xl text-textInput">{inputText}</p>
            <p className="text-lg text-error">error at {errorIndexes}</p>
        </div>
    );
};

export default TypingWorkspace;
