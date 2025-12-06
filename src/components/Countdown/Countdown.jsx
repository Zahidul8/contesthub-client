import React, { useEffect } from "react";

const Countdown = ({ deadline,setTimeLeft,timeLeft }) => {

  useEffect(() => {
    if (!deadline) return;

    const targetDate = new Date(deadline).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ expired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline,setTimeLeft]);

  if (timeLeft.expired) {
    return <p className="text-red-500 font-bold">Contest Ended</p>;
  }

  return (
    <div className="flex gap-4 text-center text-white font-bold mt-4">
      <div className="bg-primary px-4 py-2 rounded">
        {timeLeft.days} <span className="text-xs">Days</span>
      </div>
      <div className="bg-primary px-4 py-2 rounded">
        {timeLeft.hours} <span className="text-xs">Hours</span>
      </div>
      <div className="bg-primary px-4 py-2 rounded">
        {timeLeft.minutes} <span className="text-xs">Minutes</span>
      </div>
      <div className="bg-primary px-4 py-2 rounded">
        {timeLeft.seconds} <span className="text-xs">Seconds</span>
      </div>
    </div>
  );
};

export default Countdown;
