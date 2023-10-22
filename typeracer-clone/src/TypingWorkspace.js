import React, { useEffect, useState } from "react";
import getRandomParagraph from "./utils/getRandomParagraph";

const TypingWorkspace = ({
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
            <p className="mt-12 mb-12">{paragraph}</p>
            <p>{inputText}</p>
            <p>error at {errorIndexes}</p>
        </>
    );
};

export default TypingWorkspace;
