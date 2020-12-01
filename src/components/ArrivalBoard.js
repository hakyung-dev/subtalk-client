import React, { useEffect, useState } from 'react';
import RealtimeBoard from './RealTimeBoard';

const ArrivalBoard = (props) => {
  const {
    selectedStation,
    realtimeArrivalInfo,
    closeModal,
    getRealtimeArrivalInfo,
  } = props;

  const [up, setUp] = useState([]);
  const [down, setDown] = useState([]);

  useEffect(() => {
    if (selectedStation) {
      getRealtimeArrivalInfo(selectedStation);
    }
  }, [selectedStation, getRealtimeArrivalInfo]);

  useEffect(() => {
    if (realtimeArrivalInfo) {
      const reload = setTimeout(() => {
        getRealtimeArrivalInfo(selectedStation);
      }, 50000);

      return () => clearTimeout(reload);
    }
  }, [realtimeArrivalInfo]);

  useEffect(() => {
    if (realtimeArrivalInfo) {
      setUp(realtimeArrivalInfo.upLine);
      setDown(realtimeArrivalInfo.downLine);
    }
  }, [realtimeArrivalInfo]);

  const toUpArrivalInfo = up.map((arrival, i) => {
    return (
      <RealtimeBoard
        {...props}
        arrival={arrival}
        key={i}
        station={selectedStation.statnNm}
      />
    );
  });

  const toDownArrivalInfo = down.map((arrival, i) => {
    return (
      <RealtimeBoard
        {...props}
        arrival={arrival}
        key={i}
        station={selectedStation.statnNm}
      />
    );
  });

  const longName =
    selectedStation.statnNm.length > 6 ? `name long-name` : `name`;

  return (
    <div className="container-modal">
      <div className="modal-top">
        <div className="info">
          {selectedStation.statnNm}
          <span className="line">/{selectedStation.subwayNm}</span>
        </div>
        <div className="close" onClick={() => closeModal()}>
          X
        </div>
      </div>
      <div className={`platform num${selectedStation.subwayId}`}>
        <div className="from">{'< ' + selectedStation.statnTnm}</div>
        <div className="name-box">
          <div className={longName}>{selectedStation.statnNm}</div>
        </div>
        <div className="to">{selectedStation.statnFnm + ' >'}</div>
      </div>
      <div className="timer">
        <div className="board left">{toDownArrivalInfo}</div>
        <div className="board right">{toUpArrivalInfo}</div>
      </div>
    </div>
  );
};

export default ArrivalBoard;
