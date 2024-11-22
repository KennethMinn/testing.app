import { useEffect, useState } from "react";

const EndTimeCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextUTC0 = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() + 1,
          6
        )
      );
      const difference = nextUTC0.getTime() - now.getTime();

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-end gap-[4px] text-right">
      <span className="flex text-label-lg text-primary">{timeLeft.hours}h</span>{" "}
      <span className="text-label-lg text-primary">:</span>
      <span className="block text-label-lg text-primary">
        {timeLeft.minutes}m
      </span>{" "}
      <span className="text-label-lg text-primary">:</span>
      <span className="block text-label-lg text-primary">
        {timeLeft.seconds}s
      </span>
    </div>
  );
};

export default EndTimeCountdown;
