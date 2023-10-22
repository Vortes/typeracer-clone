import React, { useEffect, useRef } from "react";

const CountdownTimer = ({ timer, setTimer, timerOn }) => {
  let intervalRef = useRef(null);
  useEffect(() => {
    if (timerOn) {
      intervalRef.current = setInterval(decreaseTime, 1000);
      return () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      };
    }
  }, [timerOn]);

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
  return (
    <>
      <p className="text-2xl text-secondary">{timer}</p>
    </>
  );
};

export default CountdownTimer;
