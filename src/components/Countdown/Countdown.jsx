import React, { useEffect } from "react";

const Countdown = ({ deadline, setTimeLeft, timeLeft }) => {
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
  }, [deadline, setTimeLeft]);

  if (timeLeft.expired) {
    return (
      <p className="text-red-500 font-bold text-center text-lg md:text-xl">
        Contest Ended
      </p>
    );
  }

  const timeBlockClasses =
    "flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg transform transition-all hover:scale-105";

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      <div className={timeBlockClasses}>
        <span className="text-2xl md:text-3xl font-bold">{timeLeft.days}</span>
        <span className="text-xs md:text-sm text-gray-100">Days</span>
      </div>
      <div className={timeBlockClasses}>
        <span className="text-2xl md:text-3xl font-bold">{timeLeft.hours}</span>
        <span className="text-xs md:text-sm text-gray-100">Hours</span>
      </div>
      <div className={timeBlockClasses}>
        <span className="text-2xl md:text-3xl font-bold">{timeLeft.minutes}</span>
        <span className="text-xs md:text-sm text-gray-100">Minutes</span>
      </div>
      <div className={timeBlockClasses}>
        <span className="text-2xl md:text-3xl font-bold">{timeLeft.seconds}</span>
        <span className="text-xs md:text-sm text-gray-100">Seconds</span>
      </div>
    </div>
  );
};

export default Countdown;
