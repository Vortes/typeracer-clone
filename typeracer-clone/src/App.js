import { useEffect, useState } from "react";

function App() {
  const fetchData = async () => {
    const response = await fetch("/api/")
    const result = await response.json()
    console.log(result)
  }

  const paragraph = "hello world"
  let paragraphArray = paragraph.split("")
  const [inputText, setInputText] = useState("")
  const [textArray, setTextArray] = useState("")
  const [errorIndexes, setErrorIndexes] = useState([])
  let currentIndex = inputText.split("").length -1

  const readInput = (e) => {
    setInputText(e.target.value)
    setTextArray(e.target.value.split(''))
  }

  const handleError = () => {
    if(!errorIndexes.includes(currentIndex) && currentIndex < paragraphArray.length) {
      setErrorIndexes([...errorIndexes, currentIndex])
    }
  }

  const correctError = () => {
    console.log("in here")
    setErrorIndexes(errorIndexes.filter(error => error !== currentIndex))
  }

  useEffect(()=> {
    fetchData()
  }, [])

  return (
    <div>
      <input type="text" onChange={readInput} value={inputText} />
      <p>{paragraph}</p>
      <p>{inputText}</p>

      <p>paragraph: {paragraphArray.length}</p>

      <p>current index: {currentIndex}</p>
      {textArray[currentIndex] !== paragraphArray[currentIndex] ? handleError() : ""}
      {textArray[currentIndex] === paragraphArray[currentIndex] && errorIndexes.includes(currentIndex) ? correctError() : ""}
      <p>error at {errorIndexes}</p>
    </div>
  );
}

export default App;
