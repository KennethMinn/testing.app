import { useState, useEffect } from "react";

const Countdown = ({ initialSeconds = 60, onTimeout, reset }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  // Reset countdown if reset prop changes
  useEffect(() => {
    if (reset) {
      setSeconds(initialSeconds); // Reset to initial value
    }
  }, [reset, initialSeconds]);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeout?.(); // Notify parent when countdown ends
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onTimeout]);

  return <p>{seconds}s</p>;
};

export default Countdown;
