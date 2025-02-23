"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const birthday = new Date(new Date().getFullYear(), 11, 6); // Month is 0-based, so 11 = December
      // If birthday has passed this year, set for next year
      if (birthday.getTime() < new Date().getTime()) {
        birthday.setFullYear(birthday.getFullYear() + 1);
      }

      const difference = birthday.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // It's your birthday!
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Animate numbers when they change
    gsap.from(".number", {
      duration: 0.5,
      opacity: 0,
      y: 20,
      stagger: 0.1,
    });

    // If it's birthday (all zeros)
    if (Object.values(timeLeft).every((value) => value === 0)) {
      gsap.to(".birthday-message", {
        scale: 1.2,
        duration: 1,
        repeat: -1,
        yoyo: true,
      });
    }
  }, [timeLeft]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="text-center text-white p-8">
        <h1 className="text-4xl mb-8 font-bold">Birthday Countdown</h1>

        {Object.values(timeLeft).every((value) => value === 0) ? (
          <div className="birthday-message text-6xl font-bold">
            🎉 Happy Birthday! 🎉
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="number text-5xl font-bold">{timeLeft.days}</div>
              <div className="text-sm mt-2">Days</div>
            </div>
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="number text-5xl font-bold">{timeLeft.hours}</div>
              <div className="text-sm mt-2">Hours</div>
            </div>
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="number text-5xl font-bold">
                {timeLeft.minutes}
              </div>
              <div className="text-sm mt-2">Minutes</div>
            </div>
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="number text-5xl font-bold">
                {timeLeft.seconds}
              </div>
              <div className="text-sm mt-2">Seconds</div>
            </div>
          </div>
        )}

        <div className="mt-8 text-lg">Until December 6th</div>
      </div>
    </div>
  );
}
