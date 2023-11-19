import React, { useEffect, useRef } from "react"

const CountdownTimer = ({ timer, setTimer, timerOn }) => {
	let intervalRef = useRef(null)
	useEffect(() => {
		if (timerOn) {
			intervalRef.current = setInterval(decreaseTime, 1000)
			return () => {
				clearInterval(intervalRef.current)
				intervalRef.current = null
			}
		}
	}, [timerOn])

	const decreaseTime = () => {
		setTimer((prev) => {
			if (prev > 0) {
				return prev - 1
			} else {
				clearInterval(intervalRef.current)
				intervalRef.current = null
				return prev // keep it at 0
			}
		})
	}

	const handleTimeChange = (newTime) => {
		setTimer(newTime)
	}

	return (
		<>
			<div className="flex gap-x-2 text-lg text-white mb-2">
				<p onClick={() => handleTimeChange(2)}>2</p>
				<p onClick={() => handleTimeChange(15)}>15</p>
				<p onClick={() => handleTimeChange(30)}>30</p>
			</div>
			<p className="text-2xl text-secondary mb-2">{timer}</p>
		</>
	)
}

export default CountdownTimer
