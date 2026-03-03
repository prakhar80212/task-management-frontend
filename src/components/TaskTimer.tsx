"use client";

import { useState, useEffect } from "react";

export default function TaskTimer({ startDate, startTime, endDate, endTime }: any) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(`${endDate}T${endTime}`);

      if (now < start) {
        const diff = start.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`Starts in ${hours}h ${minutes}m`);
      } else if (now >= start && now <= end) {
        const diff = end.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${minutes}m left`);
      } else {
        setTimeLeft("Completed");
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, [startDate, startTime, endDate, endTime]);

  return (
    <div className="text-xs sm:text-sm font-semibold text-orange-400 mt-2">
      ⏱️ {timeLeft}
    </div>
  );
}
