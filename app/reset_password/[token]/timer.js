import React, { useState, useEffect } from "react";

const CustomTimer = ({ propTime }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(propTime);
  }, []);

  useEffect(() => {
    let timerId = null;
    timerId = setInterval(() => {
      if (time === 0) {
        return clearInterval(timerId);
      }
      setTime((time) => time - 1);
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [time]);

  let timeMin = parseInt(time / 60);
  let timeSec = time - timeMin * 60;

  return (
    <>
      {timeMin}.{parseInt(timeSec / 10) === 0 ? `0${timeSec}` : timeSec}
    </>
  );
};
export default CustomTimer;
