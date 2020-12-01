import React, { useEffect, useState } from 'react';

const Timer = (props) => {
  const { leftTime } = props;
  const [time, setTime] = useState(leftTime);

  const timer = () => {
    setTime(time - 1);
  };

  useEffect(() => {
    if (time > 0) {
      const callTimer = setTimeout(timer, 1000);
      return () => clearTimeout(callTimer);
    }
  }, [time]);

  const min = parseInt(time / 60) > 0 && `${parseInt(time / 60)}분`;
  const sec = time % 60 && `${time % 60}초`;

  const realTime = time > 0 && (
    <span className="real">
      {min} {sec} 전
    </span>
  );

  return realTime;
};

export default Timer;
