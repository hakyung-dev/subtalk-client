import React, { useEffect } from 'react';

const TrainInfo = (props) => {
  const { train, getTrainPosition, trainPosition } = props;

  useEffect(() => {
    if (train) {
      getTrainPosition(train);
    }
  }, [train, getTrainPosition]);

  useEffect(() => {
    if (trainPosition) {
      const reload = setTimeout(() => {
        getTrainPosition(train);
      }, 90000);

      return () => clearTimeout(reload);
    }
  }, [trainPosition]);

  const handleClick = () => {
    getTrainPosition(train);
  };

  const current = trainPosition && (
    <div className={`realtime-position num${trainPosition.subwayId}`}>
      <div className="current-station">
        <div className="info">
          <div className="number">{train.line}</div>
          <div className="station">
            {trainPosition.statnNm}역{' '}
            <span className="status">
              {trainPosition.trainSttus === 0
                ? '진입'
                : trainPosition.trainSttus === 1
                ? '도착'
                : '출발'}
            </span>
          </div>
          <button onClick={handleClick} className="refresh">↺</button>
        </div>
      </div>
    </div>
  );

  return <>{current}</>;
};

export default TrainInfo;
