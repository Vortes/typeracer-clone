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
}) => {
    const [paragraph, setParagraph] = useState("")
    const [charClassNames, setCharClassNames] = useState([])
    const [errorArray, setErrorArray] = useState([])
    const [backspacePressed, setBackspacePressed] = useState(false)

    let currentIndex = inputText.split("").length;

    useEffect(()=> {
        const generatedParagraph = getRandomParagraph(100).join(" ")
        setParagraph(generatedParagraph)
        setCharClassNames(new Array(generatedParagraph.length).fill("text-3xl text-textParagraph"));
    }, [])

    let paragraphArray = paragraph.split("");

    const convertParagraphToHTMLArray = () => {
    return paragraph.split("").map((char, index) => (
        <span key={index} className={charClassNames[index]}>
            {char}
        </span>
        ))
    }   

    const paragraphWithHTML = convertParagraphToHTMLArray()

    const handleBackspace = (e) => {
        if(e.key === "Backspace") {
            setBackspacePressed(true)
            if(e.target.className === "text-3xl text-error") {
                console.log("error text")
            }
            setCharClassNames(prevClassNames => {
                const newClassNames = [...prevClassNames]
                newClassNames[Number(currentIndex -1)] = "text-3xl text-textParagraph"
                return newClassNames
            })
        } else {
            setBackspacePressed(false)
        }
    }

    const readInput = (e) => {
        setInputText(e.target.value);   

        // if(paragraphWithHTML[currentIndex + 1].props.children === ' ') {
        //     console.log("youre typing before a space")
        //     paragraphWithHTML.splice(currentIndex, 0, `${<span>{e.target.value[currentIndex]}</span>}`)
        // }
        // console.log(paragraphWithHTML[currentIndex+1].props.children)

        if (!timerOn) {
            setTimerOn(true);
        }

        if (timer === 0) {
            e.target.disabled = true
        }

        if (e.target.value[currentIndex] === paragraphArray[currentIndex]) {
            setCharClassNames(prevClassNames => {
                const newClassNames = [...prevClassNames]
                newClassNames[currentIndex] = "text-3xl text-textInput"
                return newClassNames
            });
        }

        if (e.target.value[currentIndex] !== paragraphArray[currentIndex]) {
            handleError();
        } else if (errorIndexes.includes(currentIndex)) {
            correctError();
        }
    };

    const handleError = () => {
        if (
            // !errorIndexes.includes(currentIndex) &&
            currentIndex < paragraphArray.length && 
            !backspacePressed
        ) {
            setErrorIndexes([...errorIndexes, currentIndex]);
            setCharClassNames(prevClassNames => {
                const newClassNames = [...prevClassNames]
                newClassNames[currentIndex] = "text-3xl text-error"
                return newClassNames
            });
            if (paragraphArray[currentIndex] === ' ') {
                console.log("you're typing before a space");
    
                paragraphArray.splice(currentIndex, 0, "e");
                
                setParagraph(paragraphArray.join(""));
    
                // Adjust class names accordingly
                setCharClassNames(prevClassNames => {
                    const newClassNames = [...prevClassNames];
                    newClassNames.splice(currentIndex, 0, "text-3xl text-error");
                    return newClassNames;
                });
            }
        }
    };

    const correctError = () => {
        setErrorIndexes(errorIndexes.filter((error) => error !== currentIndex));
    };

    return (
        <div className="flex flex-col">
            <input className="border py-2" type="text" onChange={readInput} value={inputText} onKeyDown={handleBackspace}/>
            <div>
                {paragraphWithHTML}
            </div>
            {/* <p className="text-2xl text-textInput">{inputText}</p> */}
            <p className="text-lg text-error">error letters: {errorArray}</p>
            <p className="text-lg text-error">error index: {errorIndexes}</p>

        </div>
    );
};

export default TypingWorkspace;
