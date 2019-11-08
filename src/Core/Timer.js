import React, { useState, useEffect } from "react";

const Timer = props => {
  // Timer renders a due date to put it into a timer
  const { due } = props;

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Perform a refresh if there is a timer active

    const todayTime = new Date().getTime();
    // Do your operations
    const endDate = Date.parse(due);
    const seconds = (endDate - todayTime) / 1000;

    if (seconds < 0) return;
    return setTimer(seconds);
  }, [due]);

  // Timer engine
  if (timer > 0) {
    setTimeout(() => {
      let copyTime = timer;
      copyTime--;
      setTimer(copyTime);
    }, 1000);
  }

  const seconds = Math.floor(timer % 60);
  const minutes = Math.floor(timer / 60) % 60;
  const hours = Math.floor(timer / 3600) % 24;
  const days = Math.floor(timer / 86400);

  return (
    <div className="timer">
      {`${days} : ${hours} : ${minutes} : ${seconds}`}
    </div>
  );
};

export default Timer;
