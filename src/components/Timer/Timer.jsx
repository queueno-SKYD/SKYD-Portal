import React, { useState, useEffect } from 'react';

const Timer = ({ expiryTime, onTimerExpire }) => {
  const calculateTimeLeft = () => {
    const difference = expiryTime - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      onTimerExpire(); // callback when timer expires
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (Object.keys(newTimeLeft).length === 0) {
        clearTimeout(timerId);
      }
    }, 1000);

    setTimerId(timer);

    return () => {
      clearTimeout(timer);
    };
  }, [expiryTime]); // Re-run the effect when expiryTime changes

  const { hours, minutes, seconds } = timeLeft;

  return (
    <div>
      <h2>Timer</h2>
      <div>
        {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
};

export default Timer;
