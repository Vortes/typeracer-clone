import React, { useEffect, useRef, useState } from "react"
import getRandomParagraph from "./utils/getRandomParagraph"

const TypingWorkspace = ({
	timer,
	timerOn,
	setTimerOn,
	inputText,
	setInputText,
	errorIndexes,
	setErrorIndexes,
	socket,
	roomName,
	setRoomName,
}) => {
	const [paragraph, setParagraph] = useState("")
	const [charClassNames, setCharClassNames] = useState([])
	const [charIds, setCharIds] = useState([])
	const [backspacePressed, setBackspacePressed] = useState(false)
	const [roomParagraph, setRoomParagraph] = useState("")
	const inputRef = useRef()

	let currentIndex = inputText.split("").length

	useEffect(() => {
		const generatedParagraph = getRandomParagraph(100).join(" ")
		inputRef.current.focus()
		setParagraph(generatedParagraph)
		setCharIds(new Array(generatedParagraph.length).fill(""))
		setCharClassNames(
			new Array(generatedParagraph.length).fill("text-2xl text-textParagraph")
		)
	}, [])

	// ensures that all characters get the class treatment from the server
	useEffect(() => {
		if (
			paragraph &&
			(charClassNames.length !== paragraph.length ||
				charIds.length !== paragraph.length)
		) {
			setCharIds(new Array(paragraph.length).fill(""))
			setCharClassNames(
				new Array(paragraph.length).fill("text-2xl text-textParagraph")
			)
		}
	}, [paragraph, charClassNames.length, charIds.length]) // Dependency on paragraph and lengths of charClassNames and charIds

	let paragraphArray = paragraph.split("")

	const convertParagraphToHTMLArray = () => {
		return paragraph.split("").map((char, index) => (
			<span
				key={index}
				id={charIds[index]}
				className={charClassNames[index]}
			>
				{char}
			</span>
		))
	}

	const handleRoom = (e) => {
		e.preventDefault()

		if (roomName !== "") {
			socket.emit("join-room", roomName, (paragraph) => {
				setParagraph(paragraph)
			})
		}
	}

	const paragraphWithHTML = convertParagraphToHTMLArray()

	const handleBackspace = (e) => {
		if (e.key === "Backspace") {
			setBackspacePressed(true)

			if (charIds[currentIndex - 1] === "remove-me") {
				paragraphArray.splice(currentIndex - 1, 1)

				setParagraph(paragraphArray.join(""))

				setCharClassNames((prevClassNames) => {
					const newClassNames = [...prevClassNames]
					newClassNames.splice(currentIndex - 1, 1)
					return newClassNames
				})

				setCharIds((prevCharIds) => {
					const newIdNames = [...prevCharIds]
					newIdNames.splice(currentIndex - 1, 1)
					return newIdNames
				})
			}

			setCharClassNames((prevClassNames) => {
				const newClassNames = [...prevClassNames]
				newClassNames[Number(currentIndex - 1)] = "text-2xl text-textParagraph"
				return newClassNames
			})
		} else {
			setBackspacePressed(false)
		}
	}

	const readInput = (e) => {
		setInputText(e.target.value)

		if (!timerOn) {
			setTimerOn(true)
		}

		if (timer === 0) {
			e.target.disabled = true
		}

		if (e.target.value[currentIndex] === paragraphArray[currentIndex]) {
			setCharClassNames((prevClassNames) => {
				const newClassNames = [...prevClassNames]
				newClassNames[currentIndex] = "text-2xl text-textInput"
				return newClassNames
			})
		}

		if (e.target.value[currentIndex] !== paragraphArray[currentIndex]) {
			handleError()
		} else if (errorIndexes.includes(currentIndex)) {
			correctError()
		}
	}

	const handleError = () => {
		if (currentIndex < paragraphArray.length && !backspacePressed) {
			setErrorIndexes([...errorIndexes, currentIndex])
			setCharClassNames((prevClassNames) => {
				const newClassNames = [...prevClassNames]
				newClassNames[currentIndex] = "text-2xl text-error"
				return newClassNames
			})
			if (paragraphArray[currentIndex] === " ") {
				paragraphArray.splice(currentIndex, 0, "e")

				setParagraph(paragraphArray.join(""))

				setCharIds((prevCharIds) => {
					const newIdNames = [...prevCharIds]
					newIdNames.splice(currentIndex, 0, "remove-me")
					return newIdNames
				})

				setCharClassNames((prevClassNames) => {
					const newClassNames = [...prevClassNames]
					newClassNames.splice(currentIndex, 0, "text-2xl text-error")
					return newClassNames
				})
			}
		}
	}

	const correctError = () => {
		setErrorIndexes(errorIndexes.filter((error) => error !== currentIndex))
	}

	return (
		<div className="flex flex-col">
			<form
				className="flex mb-4 gap-x-2"
				onSubmit={handleRoom}
			>
				<input
					type="text"
					className="border"
					value={roomName}
					onChange={(e) => setRoomName(e.target.value)}
				/>
				<button className="bg-white px-2 rounded-md">Join room</button>
			</form>

			<input
				ref={inputRef}
				className="border py-2"
				type="text"
				onChange={readInput}
				value={inputText}
				onKeyDown={handleBackspace}
			/>
			<div className="mt-2">{paragraphWithHTML}</div>
		</div>
	)
}

export default TypingWorkspace
