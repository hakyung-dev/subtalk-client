import React, { useEffect, useState } from 'react';

const Timer = (props) => {
  const { leftTime } = props;
  const [time, setTime] = useState(leftTime);

  const timer = () => {
    setTime(time - 1);
  };

  const set = () => {
    if (time > 0) {
      setTimeout(timer, 1000);
    }
  };

  useEffect(() => {
    set();
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
