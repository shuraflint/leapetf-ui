"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2025-10-01T00:00:00+08:00");

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

export default function Countdown() {
  const [diff, setDiff] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const d = TARGET.getTime() - now.getTime();
      if (d <= 0) {
        setDiff({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setDiff({
        days: Math.floor(d / (1000 * 60 * 60 * 24)),
        hours: Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((d % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((d % (1000 * 60)) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { value: diff.days, label: "天" },
    { value: diff.hours, label: "小时" },
    { value: diff.minutes, label: "分钟" },
    { value: diff.seconds, label: "秒" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
      {items.map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center">
          <span className="text-4xl font-bold tabular-nums text-[var(--accent)] sm:text-5xl md:text-6xl">
            {pad(value)}
          </span>
          <span className="mt-1 text-sm text-[var(--foreground)] opacity-90">{label}</span>
        </div>
      ))}
    </div>
  );
}
