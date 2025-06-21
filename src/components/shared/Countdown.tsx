import React, { useEffect, useState } from "react";

interface CountdownProps {
  /**
   * The target date/time to count down to (ISO string or Date object)
   */
  target: Date | string;
  /**
   * Optional: Callback when countdown reaches zero
   */
  onComplete?: () => void;
  /**
   * Optional: Custom className for styling
   */
  className?: string;
}

const getTimeParts = (diffMs: number) => {
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
};

export const Countdown: React.FC<CountdownProps> = ({
  target,
  onComplete,
  className = "",
}) => {
  const targetDate = typeof target === "string" ? new Date(target) : target;
  const [now, setNow] = useState<Date>(new Date());
  const diffMs = targetDate.getTime() - now.getTime();
  const { days, hours, minutes, seconds } = getTimeParts(diffMs);
  const isComplete = diffMs <= 0;

  useEffect(() => {
    if (isComplete) {
      if (onComplete) onComplete();
      return;
    }
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [isComplete]);

  return (
    <span
      className={`text-xs  ${className}`.trim()}
      title={isComplete ? "Time's up!" : undefined}
    >
      {isComplete
        ? "0s"
        : [
            days > 0 ? `${days}d` : null,
            hours > 0 || days > 0 ? `${hours}h` : null,
            minutes > 0 || hours > 0 || days > 0 ? `${minutes}m` : null,
            `${seconds}s`,
          ]
            .filter(Boolean)
            .join(".")}
    </span>
  );
};

export default Countdown;
